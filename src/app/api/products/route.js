import { ProductService } from "../../services/productService";
import { apiResponse } from "../../utils/api";
import { AppError, handleError } from "../../utils/error";

export async function GET() {
  
  try {
    const products = await ProductService.getAllProducts();
    if (!products) {
      throw new AppError("products not found", 404);
    }
    return apiResponse.success(products);
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(request) {
    try {
      const body = await request.json();
      const product = await ProductService.createProduct(body);
      return apiResponse.success(product);
    } catch (err) {
      return handleError(err);
    }
  }