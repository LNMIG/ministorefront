import { GET_ALL_CATEGORIES } from '../constants'
let URL = process.env.REACT_APP_API || 'http://localhost:4000/api'

const getAllCategories = () => {
    return async function (dispatch) {
        try {
            const response = await fetch(`${URL}/graphql`, {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ query: `
                                                query {
                                                  getCategories {
                                                    name
                                                  }
                                                }
                                              ` }),
                                              })
            const json = await response.json()
            sessionStorage.setItem('allCategories',JSON.stringify(json.data.getCategories))
            return dispatch({type: GET_ALL_CATEGORIES, payload: json.data.getCategories})
        } catch (e) {
            return console.error('Error in GET ALL CATEGORIES: ',e)
        }
    }
}

export default getAllCategories