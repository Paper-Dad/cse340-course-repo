import db from './db.js'
import bcrypt from 'bcrypt';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, default_role];

    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const query_params = [email];

    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; // User not found
    }

    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null;
    }

  
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
        return null;
    }

    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
};

const getAllUsers = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        ORDER BY u.user_id;
    `;

    const result = await db.query(query);
    return result.rows;
};

const createProjectVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO users_project (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id) DO NOTHING
        RETURNING *
    `;

    const result = await db.query(query, [userId, projectId]);

    if (result.rows.length === 0) {
        return null; // already exists
    }

    return result.rows[0];
};

const removeProjectVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM users_project
        WHERE user_id = $1 AND project_id = $2
        RETURNING *
    `;

    const result = await db.query(query, [userId, projectId]);

    if (result.rows.length === 0) {
        return null; // not found
    }

    return result.rows[0];
};

const getUserProjects = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.project_date, o.name AS organization_name
        FROM users_project up
        JOIN project p ON up.project_id = p.project_id
        JOIN organization o ON p.organization_id = o.organization_id
        WHERE up.user_id = $1
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
};


export { createUser, authenticateUser, getAllUsers, createProjectVolunteer, removeProjectVolunteer, getUserProjects };