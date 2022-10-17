import { GET_PRODUCT_BY_ID } from '../constants'
let URL = process.env.REACT_APP_API || 'http://localhost:4000/api'

const getProductById = (productId) => {
    const String = { productId: productId }

    return async function (dispatch) {
        try {
          const response = await fetch(`${URL}/graphql`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ query: `
                                      query ($productId: String!) {
                                        getProduct(setId: $productId) {
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
                                                label
                                                symbol
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
          sessionStorage.setItem('productDetails', JSON.stringify(json.data.getProduct))
          return dispatch({type: GET_PRODUCT_BY_ID, payload: json.data.getProduct})
        } catch (e) {
          return console.error('Error in GET PRODUCT BY ID: ',e)
        }
    }
}
export default getProductById