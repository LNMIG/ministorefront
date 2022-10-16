import { POST_CURRENT_SELECTED_CURRENCY } from '../constants'

const postSelectedCurrency = (selectedCurrency) => {
    sessionStorage.setItem('currentCurrency', JSON.stringify(selectedCurrency))
    return {type: POST_CURRENT_SELECTED_CURRENCY, payload: selectedCurrency}
}
export default postSelectedCurrency