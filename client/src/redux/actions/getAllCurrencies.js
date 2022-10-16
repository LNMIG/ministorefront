import { GET_ALL_CURRENCIES } from '../constants'
let URL = process.env.REACT_APP_API || 'http://localhost:4000/api'

const getAllCurrencies = () => {
    return async function (dispatch) {
        try {
          const response = await fetch(`${URL}/graphql`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ query: `
                                      query {
                                        getCurrencies {
                                          label
                                          symbol
                                        }
                                      }
                                    ` }),
                                    })
          const json = await response.json()
          return dispatch({type: GET_ALL_CURRENCIES, payload: json.data.getCurrencies})
        } catch (e) {
            return console.error('Error in GET ALL CURRENCIES: ',e)
        }
    }
}
export default getAllCurrencies