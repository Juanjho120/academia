import axios from 'axios'
import { getTokenSession } from '../utils/auth'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_ROUTE
});

function configRequestSuccess(config) {
    const token = getTokenSession()

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

function configRequestFail(error) {
    return Promise.reject(error)
}


http.interceptors.request.use(
    configRequestSuccess,
    configRequestFail    
)

function validateError(error) {
    const token = getTokenSession()
    if(token) return Promise.reject(error)
    window.location.herf = '/login'
    return
}

function validateSuccess(response) {
    return response
}

const baseApi = {
    get: (path) => http.get(path).then(validateSuccess).catch(validateError),
    post: (path, request) => http.post(path, request).then(validateSuccess).catch(validateError),
    postLogin: (path, request) => http.post(path, request).then(validateSuccess),
    put: (path, request) => http.put(path, request).then(validateSuccess).catch(validateError),
    delete: (path) => http.delete(path).then(validateSuccess).catch(validateError)
}

export default baseApi