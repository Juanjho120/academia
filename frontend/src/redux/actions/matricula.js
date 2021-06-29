import baseApi from '../../services/api'
import * as matriculaTypes from '../types/matricula'

export const getListMatriculas = () => async(dispatch) => {
    try {
        dispatch({
            type: matriculaTypes.LIST_MATRICULAS_START
        })
        const response = await baseApi.get('/matriculas')
        dispatch({
            type: matriculaTypes.LIST_MATRICULAS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: matriculaTypes.LIST_MATRICULAS_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al obtener las matriculas'
            }
        })
    } finally {
        dispatch({
            type: matriculaTypes.LIST_MATRICULAS_FINALLY
        })
    }
    
}

export const getListMatriculasByEstudiante = (id) => async(dispatch) => {
    try {
        dispatch({
            type: matriculaTypes.GET_MATRICULAS_ESTUDIANTE_START
        })

        const response = await baseApi.get(`/matriculas/estudiante/${id}`)
        
        dispatch({
            type: matriculaTypes.GET_MATRICULAS_ESTUDIANTE_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: matriculaTypes.GET_MATRICULAS_ESTUDIANTE_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al obtener las matriculas del estudiante'
            }
        })
    } finally {
        dispatch({
            type: matriculaTypes.GET_MATRICULAS_ESTUDIANTE_FINALLY
        })
    }
    
}

export const clearListMatriculas = () => async(dispatch) => {
    dispatch({
        type: matriculaTypes.CLEAR_MATRICULAS
    })
}

export const clearListMatriculasEstudiante = () => async(dispatch) => {
    dispatch({
        type: matriculaTypes.CLEAR_MATRICULAS_ESTUDIANTE
    })
}

export const addNewMatricula = ({ estudiante, cursos, estado }) => async(dispatch) => {
    try {
        dispatch({ type: matriculaTypes.ADD_NEW_MATRICULA_START })
        const request = {
            estudiante,
            cursos,
            estado
        }
        const response = await baseApi.post('/matriculas', request)
        dispatch({ 
            type: matriculaTypes.ADD_NEW_MATRICULA_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({ 
            type: matriculaTypes.ADD_NEW_MATRICULA_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al agregar matricula'
            }
        })
    } finally {
        dispatch({ type: matriculaTypes.ADD_NEW_MATRICULA_FINALLY })
    }
}

export const getMatriculaItem = (data) => async(dispatch) => {
    dispatch({
        type: matriculaTypes.SELECT_MATRICULA_ITEM,
        payload: data
    })
}

export const getMatriculaById = (id, callback) => async(dispatch) => {
    try {
        dispatch({
            type: matriculaTypes.GET_MATRICULA_START
        })
        const response = await baseApi.get(`/matriculas/${id}`)
        dispatch({
            type: matriculaTypes.GET_MATRICULA_SUCCESS,
            payload: response.data
        })

        callback()
    } catch (error) {
        dispatch({
            type: matriculaTypes.GET_MATRICULA_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al obtener la matricula'
            }
        })
    } finally {
        dispatch({
            type: matriculaTypes.GET_MATRICULA_FINALLY
        })
    }
    
}