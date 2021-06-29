import baseApi from '../../services/api'
import * as estudianteTypes from '../types/estudiante'

export const getListEstudiantes = () => async(dispatch) => {
    try {
        dispatch({
            type: estudianteTypes.LIST_ESTUDIANTES_START
        })
        const response = await baseApi.get('/estudiantes')
        dispatch({
            type: estudianteTypes.LIST_ESTUDIANTES_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: estudianteTypes.LIST_ESTUDIANTES_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al obtener los estudiantes'
            }
        })
    } finally {
        dispatch({
            type: estudianteTypes.LIST_ESTUDIANTES_FINALLY
        })
    }
    
}

export const clearListEstudiantes = () => async(dispatch) => {
    dispatch({
        type: estudianteTypes.CLEAR_ESTUDIANTES
    })
}

export const addNewEstudiante = ({ nombres, apellidos, dni, edad}) => async(dispatch) => {
    try {
        dispatch({ type: estudianteTypes.ADD_NEW_ESTUDIANTE_START })
        const request = {
            nombres,
            apellidos,
            edad,
            dni
        }
        const response = await baseApi.post('/estudiantes', request)
        dispatch({ 
            type: estudianteTypes.ADD_NEW_ESTUDIANTE_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({ 
            type: estudianteTypes.ADD_NEW_ESTUDIANTE_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al agregar estudiante'
            }
        })
    } finally {
        dispatch({ type: estudianteTypes.ADD_NEW_ESTUDIANTE_FINALLY })
    }
}

export const deleteEstudiante = (id) => async(dispatch) => {
    try {
        dispatch({ type: estudianteTypes.DELETE_ESTUDIANTE_START })
        await baseApi.delete(`/estudiantes/${id}`)
        dispatch({ 
            type: estudianteTypes.DELETE_ESTUDIANTE_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({ 
            type: estudianteTypes.DELETE_ESTUDIANTE_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al eliminar estudiante'
            }
        })
    } finally {
        dispatch({ type: estudianteTypes.DELETE_ESTUDIANTE_FINALLY })
    }
}

export const editEstudiante = ({ nombres, apellidos, dni, edad}, id) => async(dispatch) => {
    try {
        dispatch({ type: estudianteTypes.UPDATE_ESTUDIANTE_START })
        const request = {
            nombres,
            apellidos,
            edad,
            dni
        }
        const response = await baseApi.put(`/estudiantes/${id}`, request)
        dispatch({ 
            type: estudianteTypes.UPDATE_ESTUDIANTE_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({ 
            type: estudianteTypes.UPDATE_ESTUDIANTE_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al editar estudiante'
            }
        })
    } finally {
        dispatch({ type: estudianteTypes.UPDATE_ESTUDIANTE_FINALLY })
    }
}