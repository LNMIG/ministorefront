import { CHECKOUT_PRODUCTS } from '../constants'
import checkOut from '../services/checkOut.js'

const checkoutProducts = (currentSelection, currentCurrency) => {
    let checkoutProducts = JSON.parse(JSON.stringify(currentSelection))
    let current = JSON.parse(JSON.stringify(currentCurrency))
    let data = checkOut(checkoutProducts, current)
    return {type: CHECKOUT_PRODUCTS, payload: data}
}
export default checkoutProducts