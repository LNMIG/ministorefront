import { CLEAR_PRODUCT_DETAILS } from '../constants'

const clearProductDetails = () => {
  sessionStorage.setItem('productDetails', JSON.stringify({}))
  return {type: CLEAR_PRODUCT_DETAILS, payload: {}}
}
export default clearProductDetails