import { createStore } from 'redux'

const reducer = (state, action) => {
    if (action.type === 'LOAD_ITEMS_DB') {
        return {
            ...state,
            items: action.items
        }
    }
    if (action.type === 'LOGIN_SUCCESS') {
        return {
            ...state,
            logged: {
                status: true,
                username: action.username
            }
        }
    }
    if (action.type === "ADD_TO_CART") {
        return {
            ...state,
            cart: action.cart
        }
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            logged: {
                status: false
            }
        }
    }
    return state
}

const store = createStore(
    reducer, {
    items: [],
    logged: {
        status: false
    },
    cart: []
},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store