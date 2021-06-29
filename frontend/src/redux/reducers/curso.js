import * as cursoTypes from '../types/curso'

const initialState = {
    loading: false,
    data: null,
    error: {
        error: false,
        message: ''
    }
}

export default function cursos(state = initialState, action) {
    switch(action.type) {
        case cursoTypes.LIST_CURSOS_START:
            return {
                ...state,
                loading: true
            }
        case cursoTypes.LIST_CURSOS_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case cursoTypes.LIST_CURSOS_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case cursoTypes.LIST_CURSOS_FINALLY:
            return {
                ...state,
                loading: false
            }
        case cursoTypes.CLEAR_CURSOS:
            return initialState
        case cursoTypes.ADD_NEW_CURSO_START:
            return {
                ...state,
                loading: true
            }
        case cursoTypes.ADD_NEW_CURSO_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case cursoTypes.ADD_NEW_CURSO_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case cursoTypes.ADD_NEW_CURSO_FINALLY:
            return {
                ...state,
                loading: false
            }
        case cursoTypes.DELETE_CURSO_START:
            return {
                ...state,
                loading: true
            }
        case cursoTypes.DELETE_CURSO_SUCCESS:
            const currentData = state.data
            const newData = currentData.filter((e) => e.id !== action.payload)
            return {
                ...state,
                data: newData
            }
        case cursoTypes.DELETE_CURSO_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case cursoTypes.DELETE_CURSO_FINALLY:
            return {
                ...state,
                loading: false
            }
        case cursoTypes.UPDATE_CURSO_START:
            return {
                ...state,
                loading: true
            }
        case cursoTypes.UPDATE_CURSO_SUCCESS:
            const newArr = state.data
            const index = newArr.findIndex((e) => e.id === action.payload.id)
            newArr[index] = action.payload
            return {
                ...state,
                data: newArr
            }
        case cursoTypes.UPDATE_CURSO_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case cursoTypes.UPDATE_CURSO_FINALLY:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}