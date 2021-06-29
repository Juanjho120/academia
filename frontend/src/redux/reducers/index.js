import { combineReducers } from 'redux';
import user from './user'
import estudiante from './estudiante'
import curso from './curso'
import matricula from './matricula'
import menu from './menu'

export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        user,
        estudiante,
        curso,
        matricula,
        menu,
        ...injectedReducers,
    });

    return rootReducer;
}