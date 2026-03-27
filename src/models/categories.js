import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
        FROM categories
        ORDER BY category_name
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            category_name
        FROM categories
        WHERE category_id = $1
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name
        FROM categories c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name
    `;

    const result = await db.query(query, [projectId]);
    return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            p.organization_id
        FROM project p
        JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date, p.title
    `;

    const result = await db.query(query, [categoryId]);
    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO project_category (project_id, category_id)
        VALUES ($1, $2)
    `;

    await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, delete existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1
    `;

    await db.query(deleteQuery, [projectId]);

    // Then, insert the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

const createCategory = async (categoryName) => {
    const query = `
    INSERT INTO categories (category_name)
    VALUES ($1)
    RETURNING category_id;
  `;

    const query_params = [categoryName];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new category with ID:', result.rows[0].category_id);
    }

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, categoryName) => {
    const query = `
        UPDATE categories
        SET category_name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const query_params = [categoryName, categoryId];
    const result = await db.query(query, query_params);

    // If no rows were updated → category doesn't exist
    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated category with ID:', categoryId);
    }

    return result.rows[0].category_id;
};


export {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};