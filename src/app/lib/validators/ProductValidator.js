export const validateProduct = (data) => {
    const errors = {}

    if (!data.name || data.name.trim() === '') {
        errors.name = 'name is required'
    } else if (data.name.length > 255) {
        errors.name = 'Name must be less than 255 characters long'
    }

    if (data.description && data.description.length > 1000) {
        errors.description = 'Description must be less than 1000 characters long'
    } 

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}   