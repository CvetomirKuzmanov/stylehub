import { ProductModel } from "../models/ProductModel";
import { validateProduct } from "../lib/validators/ProductValidator";

export const ProductService = {
  getAllProducts: async () => {
    
    return await ProductModel.findAll();
  },
  
  getProductById: async (id) => {
    return await ProductModel.findById(id);
  },
  
  createProduct: async (productData) => {
    const validation = validateProduct(productData);
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors));
    }
    return await ProductModel.create(productData);
  },
  
  deleteProduct: async (id) => {
    return await ProductModel.delete(id); 
  },
  
  updateProduct: async (id, updates) => {
    const validation = validateProduct(updates);
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors));
    }
    return await ProductModel.update(id, updates);
  }
}