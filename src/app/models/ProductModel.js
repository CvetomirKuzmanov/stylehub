import { query } from "../lib/db";

export const ProductModel = {
  findAll: async () => {
    const result = await query('SELECT * FROM products ORDER BY id DESC');
    return result.rows; 
  },
  
  findById: async (id) => {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  },
  
  create: async ({name, description, price, image, productid}) => {
    const result = await query('INSERT INTO products (name, description) VALUES ($1, $2) RETURNING *', [name, description, price, image, productid]);
    return result.rows[0];
  },
  
  update: async (id, updates) => {
    const {name, description, price, image} = updates;
    const result = await query('UPDATE products SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, price, image, id]);
    return result.rows[0];
  },
  
  delete: async (id) => { 
    const result = await query('DELETE FROM products WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}