import { ProductService } from "../../../services/productService";
import { apiResponse } from "../../../utils/api";
import { AppError, handleError } from "../../../utils/error";

export async function GET( request, { params }) {
    try {
        const { id } = params;
        const product  = await ProductService.getProductById(Number(id))

        if (!product) {
            throw new AppError ('product not found', 404)
        }
        
        return apiResponse.success(product)
    } catch (err) {
        return handleError(err)
    }
}

export async function PUT (request, {params}) {
    try {
        const {id} = params
        const body = await request.json ()
        const product = await ProductService.updateProduct(Number(id), body)
        
        if (!product) {
            throw new AppError('product not found', 404)
        }

        return apiResponse.success(product)
    } catch (err) {
        return handleError(err)
    }
}

export async function DELETE ( {params}) {
    try {
        const {id} = params
        const success = await ProductService.deleteProduct (Number(id))
        if (!success) {
            throw new AppError('product not found', 404);
        }

        return apiResponse.success ({message: 'product deleted successfully'})
    } catch (err) {
        return handleError(err);
    }
}