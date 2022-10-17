import { GET_PRODUCTS_BY_CATEGORY } from '../constants'
let URL = process.env.REACT_APP_API || 'http://localhost:4000/api'

const getProductsByCategory = (categoryInput = "all") => {

    const String = { name: categoryInput }

    return async function (dispatch) {
        try {
          const response = await fetch(`${URL}/graphql`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        query: `
                                            query ($name: String!){
                                                getCategory (name: $name){
                                                    setId
                                                    name
                                                    inStock
                                                    gallery
                                                    description
                                                    category
                                                    attributes {
                                                      id
                                                      name
                                                      type
                                                      items {
                                                        displayValue
                                                        value
                                                        id
                                                      }
                                                    }
                                                    prices {
                                                      currency {
                                                        symbol
                                                        label
                                                      }
                                                      amount
                                                    }
                                                    brand
                                                }
                                            }`,
                                        variables: String
                                    }),
                                    })
          const json = await response.json()
          return dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: json.data.getCategory})
        } catch (e) {
            return console.error('Error in GET PRODUCTS BY CATEGORY: ',e)
        }
    } 
}
export default getProductsByCategory