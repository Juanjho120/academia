import * as matriculaTypes from '../types/matricula'

const initialStateAux = {
    loading: false,
    data: null,
    error: {
        error: false,
        message: ''
    }
}

const initialState = {
    list: initialStateAux,
    filterList: initialStateAux,
    matriculaItem: initialStateAux
}

export default function matriculas(state = initialState, action) {
    switch(action.type) {
        case matriculaTypes.LIST_MATRICULAS_START:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true
                }
            }
        case matriculaTypes.LIST_MATRICULAS_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: action.payload
                }
            }
        case matriculaTypes.LIST_MATRICULAS_FAIL:
            return {
                ...state.error,
                list: {
                    ...state.list,
                    error: {
                        ...state.list.error,
                        error: action.payload.error,
                        message: action.payload.message
                    }
                }
            }
        case matriculaTypes.LIST_MATRICULAS_FINALLY:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false
                }
            }
        case matriculaTypes.GET_MATRICULAS_ESTUDIANTE_START:
        return {
            ...state,
            filterList: {
                ...state.filterList,
                loading: true
            }
        }
        case matriculaTypes.GET_MATRICULAS_ESTUDIANTE_SUCCESS:
            return {
                ...state,
                filterList: {
                    ...state.filterList,
                    data: action.payload
                }
            }
        case matriculaTypes.GET_MATRICULAS_ESTUDIANTE_FAIL:
            return {
                ...state.error,
                filterList: {
                    ...state.filterList,
                    error: {
                        ...state.filterList.error,
                        error: action.payload.error,
                        message: action.payload.message
                    }
                }
            }
        case matriculaTypes.GET_MATRICULAS_ESTUDIANTE_FINALLY:
            return {
                ...state,
                filterList: {
                    ...state.filterList,
                    loading: false
                }
            }
        case matriculaTypes.CLEAR_MATRICULAS:
            return {
                ...state,
                list: initialStateAux
            }
        case matriculaTypes.CLEAR_MATRICULAS_ESTUDIANTE:
            return {
                ...state,
                filterList: initialStateAux
            }
        case matriculaTypes.ADD_NEW_MATRICULA_START:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true
                }
            }
        case matriculaTypes.ADD_NEW_MATRICULA_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [...state.list.data, action.payload]
                }
                
            }
        case matriculaTypes.ADD_NEW_MATRICULA_FAIL:
            return {
                ...state.error,
                list: {
                    ...state.list,
                    error: {
                        ...state.list.error,
                        error: action.payload.error,
                        message: action.payload.message
                    }
                }
            }
        case matriculaTypes.ADD_NEW_MATRICULA_FINALLY:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false
                }
            }
        case matriculaTypes.SELECT_MATRICULA_ITEM:
            return {
                ...state,
                matriculaItem: {
                    ...state.matriculaItem,
                    data: action.payload
                }
                
            }
        case matriculaTypes.GET_MATRICULA_START:
            return {
                ...state,
                matriculaItem: {
                    ...state.matriculaItem,
                    loading: true
                }
            }
        case matriculaTypes.GET_MATRICULA_SUCCESS:
            return {
                ...state,
                matriculaItem: {
                    ...state.matriculaItem,
                    data: action.payload
                }
            }
        case matriculaTypes.GET_MATRICULA_FAIL:
            return {
                ...state.error,
                matriculaItem: {
                    ...state.matriculaItem,
                    error: {
                        ...state.matriculaItem.error,
                        error: action.payload.error,
                        message: action.payload.message
                    }
                }
            }
        case matriculaTypes.GET_MATRICULA_FINALLY:
            return {
                ...state,
                matriculaItem: {
                    ...state.matriculaItem,
                    loading: false
                }
            }
        default:
            return state
    }
}