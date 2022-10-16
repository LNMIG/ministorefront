import { 
    GET_ALL_CURRENCIES,
    GET_ALL_CATEGORIES,
    GET_PRODUCT_BY_ID,
    GET_PRODUCTS_BY_CATEGORY,
    POST_PAGINATION_DATA,
    POST_CURRENT_CATEGORY,
    POST_CURRENT_SELECTED_PRODUCTS,
    POST_CURRENT_SELECTED_CURRENCY,
    POST_PRODUCT_TO_CART,
    CLEAR_PRODUCT_DETAILS,
    REMOVE_PRODUCT_FROM_CART,
    PUT_NEW_PRODUCT_ATTRIBUTE,
    CHECKOUT_PRODUCTS,
    POST_BLOCKER,
} from '../constants'

const initialState = {
    allCategories: [],
    allCurrencies: [],
    productsByCategory: [],
    paginationData: [],
    productDetails: {},
    postedCurrentCategory: {},
    postedCurrentCurrency: [],
    postedProductsToCart: [],
    checkoutProducts: [],
    blocker: false,
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_CATEGORY:
        return {
        ...state,
        productsByCategory: action.payload
        }
        case GET_ALL_CURRENCIES:
        return {
        ...state,
        allCurrencies: action.payload
        }
        case GET_ALL_CATEGORIES:
        return {
        ...state,
        allCategories: action.payload
        }
        case GET_PRODUCT_BY_ID:
        return {
        ...state,
        productDetails: action.payload
        }
        case CLEAR_PRODUCT_DETAILS:
        return {
        ...state,
        productDetails: action.payload
        }
        case POST_PAGINATION_DATA:
        return {
        ...state,
        paginationData: action.payload
        }
        case POST_CURRENT_CATEGORY:
        return {
        ...state,
        postedCurrentCategory: action.payload
        }
        case POST_CURRENT_SELECTED_PRODUCTS:
        return {
        ...state,
        productsByCategory: action.payload
        }
        case POST_CURRENT_SELECTED_CURRENCY:
        return {
        ...state,
        postedCurrentCurrency: action.payload
        }
        case POST_PRODUCT_TO_CART:
        return {
        ...state,
        postedProductsToCart: action.payload
        }
        case PUT_NEW_PRODUCT_ATTRIBUTE:
        return {
        ...state,
        postedProductsToCart: action.payload
        }
        case REMOVE_PRODUCT_FROM_CART:
        return {
        ...state,
        postedProductsToCart: state.postedProductsToCart.filter((product) => product.idForDeletion !== action.payload)
        }
        case CHECKOUT_PRODUCTS:
        return {
        ...state,
        checkoutProducts: action.payload
        }
        case POST_BLOCKER:
        return {
        ...state,
        blocker: !state.blocker
        }
        default:
        return state;
    }
}
export default reducer;