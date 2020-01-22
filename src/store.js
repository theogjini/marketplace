import { createStore } from 'redux'

const reducer = (state, action) => {
    if (action.type === 'LOGIN_SUCCESS') {
        return {
            ...state,
            logged: {
                status: true,
                username: action.username
            }
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
    }
},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log(store)

export default store