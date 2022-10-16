import { PUT_NEW_PRODUCT_ATTRIBUTE } from '../constants'
import updateProductInCart from '../services/updateProductInCart'

const putNewProductAttribute = (postedProductsToCart, productIdForDeletion, modifiedAttribute) => {
    let postedProducts = JSON.parse(JSON.stringify(postedProductsToCart))
    let data = updateProductInCart(postedProducts, productIdForDeletion, modifiedAttribute)
    localStorage.setItem('cart', JSON.stringify(data))
    return {type: PUT_NEW_PRODUCT_ATTRIBUTE, payload: data}
}
export default putNewProductAttribute