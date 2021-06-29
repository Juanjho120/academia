import baseApi from '../../services/api'
import * as cursoTypes from '../types/curso'

export const getListCursos = () => async(dispatch) => {
    try {
        dispatch({
            type: cursoTypes.LIST_CURSOS_START
        })
        const response = await baseApi.get('/cursos')
        dispatch({
            type: cursoTypes.LIST_CURSOS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: cursoTypes.LIST_CURSOS_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al obtener los cursos'
            }
        })
    } finally {
        dispatch({
            type: cursoTypes.LIST_CURSOS_FINALLY
        })
    }
}

export const clearListCursos = () => async(dispatch) => {
    dispatch({
        type: cursoTypes.CLEAR_CURSOS
    })
}

export const addNewCurso = ({ nombre, siglas, estado}) => async(dispatch) => {
    try {
        dispatch({ type: cursoTypes.ADD_NEW_CURSO_START })
        const request = {
            nombre,
            siglas,
            estado
        }
        const response = await baseApi.post('/cursos', request)
        dispatch({ 
            type: cursoTypes.ADD_NEW_CURSO_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({ 
            type: cursoTypes.ADD_NEW_CURSO_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al agregar curso'
            }
        })
    } finally {
        dispatch({ type: cursoTypes.ADD_NEW_CURSO_FINALLY })
    }
}

export const deleteCurso = (id) => async(dispatch) => {
    try {
        dispatch({ type: cursoTypes.DELETE_CURSO_START })
        await baseApi.delete(`/cursos/${id}`)
        dispatch({ 
            type: cursoTypes.DELETE_CURSO_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({ 
            type: cursoTypes.DELETE_CURSO_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al eliminar curso'
            }
        })
    } finally {
        dispatch({ type: cursoTypes.DELETE_CURSO_FINALLY })
    }
}

export const editCurso = ({ nombre, siglas, estado}, id) => async(dispatch) => {
    try {
        dispatch({ type: cursoTypes.UPDATE_CURSO_START })
        const request = {
            nombre,
            siglas,
            estado
        }
        const response = await baseApi.put(`/cursos/${id}`, request)
        dispatch({ 
            type: cursoTypes.UPDATE_CURSO_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({ 
            type: cursoTypes.UPDATE_CURSO_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al editar curso'
            }
        })
    } finally {
        dispatch({ type: cursoTypes.UPDATE_CURSO_FINALLY })
    }
}