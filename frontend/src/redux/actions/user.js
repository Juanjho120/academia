import baseApi from '../../services/api'
import * as userTypes from '../types/user'
import { removeToken, setTokenSession } from '../../utils/auth'

export const doLogin = (request, callback) => async(dispatch) => {
    try {
        dispatch({ 
            type: userTypes.DO_LOGIN_START 
        })

        const { data: response } = await baseApi.postLogin('/login', request)
        dispatch({ 
            type: userTypes.DO_LOGIN_SUCCESS,
            payload: response.token
        })

        const dateExpiration = new Date(response.expiracion)
        setTokenSession(response.token, dateExpiration)
        callback()
    } catch (error) {
        dispatch({ 
            type: userTypes.DO_LOGIN_FAIL,
            payload: {
                error: true,
                message: 'Ocurrió un error'
            }
        })
    } finally {
        dispatch({ 
            type: userTypes.DO_LOGIN_FINALLY 
        })
    }
}

export const signOut = () => (dispatch) => {
    dispatch({ type: userTypes.SIGN_OUT })
    removeToken()
}