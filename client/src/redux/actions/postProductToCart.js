import { POST_PRODUCT_TO_CART } from '../constants'
import checkToStoreProduct from '../services/checkToStoreProduct'

const postProductToCart = (pastSelection, currentSelection) => {
    let past = JSON.parse(JSON.stringify(pastSelection))
    let current = JSON.parse(JSON.stringify(currentSelection))
    let data = checkToStoreProduct(past, current)
    localStorage.setItem('cart', JSON.stringify(data))
    return {type: POST_PRODUCT_TO_CART, payload: data}
}
export default postProductToCart