import * as menuTypes from '../types/menu'

const initialState = {
    loading: false,
    data: null,
    error: {
        error: false,
        message: ''
    }
}

export default function menus(state = initialState, action) {
    switch(action.type) {
        case menuTypes.BUILD_MENU_START:
            return {
                ...state,
                loading: true
            }
        case menuTypes.BUILD_MENU_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case menuTypes.BUILD_MENU_FAIL:
            return {
                ...state,
                error: {
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case menuTypes.BUILD_MENU_FINALLY:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}