import { REMOVE_PRODUCT_FROM_CART } from '../constants'

const removeProductFromCart = (data) => {
    let old = JSON.parse(localStorage.getItem('cart'))
    let neww = old.filter((product) => product.idForDeletion !== data)
    localStorage.setItem('cart', JSON.stringify(neww))
    return {type: REMOVE_PRODUCT_FROM_CART, payload: data}
}
export default removeProductFromCart