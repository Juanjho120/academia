import * as menuTypes from '../types/menu'
import http from '../../services/api'

export const getMenu = () => async(dispatch) => {
    try {
        dispatch({ type: menuTypes.BUILD_MENU_START })
        
        const response = await http.get('/menus')

        dispatch({
            type: menuTypes.BUILD_MENU_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: menuTypes.BUILD_MENU_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error al obtener los menús'
            }
        })
    } finally {
        dispatch({ type: menuTypes.BUILD_MENU_FINALLY })
    }
}