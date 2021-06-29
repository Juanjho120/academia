
import * as estudianteTypes from '../types/estudiante'

const initialState = {
    loading: false,
    data: null,
    error: {
        error: false,
        message: ''
    }
}

export default function estudiantes(state = initialState, action) {
    switch(action.type) {
        case estudianteTypes.LIST_ESTUDIANTES_START:
            return {
                ...state,
                loading: true
            }
        case estudianteTypes.LIST_ESTUDIANTES_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case estudianteTypes.LIST_ESTUDIANTES_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case estudianteTypes.LIST_ESTUDIANTES_FINALLY:
            return {
                ...state,
                loading: false
            }
        case estudianteTypes.CLEAR_ESTUDIANTES:
            return initialState
        case estudianteTypes.ADD_NEW_ESTUDIANTE_START:
            return {
                ...state,
                loading: true
            }
        case estudianteTypes.ADD_NEW_ESTUDIANTE_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case estudianteTypes.ADD_NEW_ESTUDIANTE_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case estudianteTypes.ADD_NEW_ESTUDIANTE_FINALLY:
            return {
                ...state,
                loading: false
            }
        case estudianteTypes.DELETE_ESTUDIANTE_START:
            return {
                ...state,
                loading: true
            }
        case estudianteTypes.DELETE_ESTUDIANTE_SUCCESS:
            const currentData = state.data
            const newData = currentData.filter((e) => e.id !== action.payload)
            return {
                ...state,
                data: newData
            }
        case estudianteTypes.DELETE_ESTUDIANTE_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case estudianteTypes.DELETE_ESTUDIANTE_FINALLY:
            return {
                ...state,
                loading: false
            }
        case estudianteTypes.UPDATE_ESTUDIANTE_START:
            return {
                ...state,
                loading: true
            }
        case estudianteTypes.UPDATE_ESTUDIANTE_SUCCESS:
            const newArr = state.data
            const index = newArr.findIndex((e) => e.id === action.payload.id)
            newArr[index] = action.payload
            return {
                ...state,
                data: newArr
            }
        case estudianteTypes.UPDATE_ESTUDIANTE_FAIL:
            return {
                ...state.error,
                error: {
                    ...state.error,
                    error: action.payload.error,
                    message: action.payload.message
                }
            }
        case estudianteTypes.UPDATE_ESTUDIANTE_FINALLY:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}