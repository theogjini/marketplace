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
                username: action.username,
            }
        }
    }
    if (action.type === 'GET_USER_DATA') {
        return {
            ...state,
            userData: action.userData
        }
    }
    if (action.type === "ADD_TO_CART") {
        console.log('action.cart', action.cart)
        return {
            ...state,
            cart: action.cart
        }
    }
    if (action.type === "DELETE_ITEM") {
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
    if (action.type === "EMPTY_CART") {
        return {
            ...state,
            cart: []
        }
    }
    return state
}

const store = createStore(
    reducer, {
    popupItem: false,
    items: [],
    logged: {
        status: false
    },
    cart: [],
    userData: {}
},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store