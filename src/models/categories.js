import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT 
            c.category_id,
            c.category_name,
            p.project_id,
            p.title,
            p.description
        FROM categories c
        JOIN project_category pc
        ON c.category_id = pc.category_id
        JOIN project p
        ON pc.project_id = p.project_id
        ORDER BY c.category_name, p.title
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllCategories }