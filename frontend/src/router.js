import { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Login from './pages/login'
import { getTokenSession } from "./utils/auth"
import * as menuActions from './redux/actions/menu'
import * as userTypes from './redux/types/user'
import { CircularProgress } from '@material-ui/core'
import { decodeToken } from './utils/auth'

const Estudiantes = lazy(() => import('./pages/estudiante'))
const Home = lazy(() => import('./pages/home'))
const Cursos = lazy(() => import('./pages/curso'))
const Matriculas = lazy(() => import('./pages/matricula'))
const MatriculasCreate = lazy(() => import('./pages/matriculas-create'))
const MatriculasDetail = lazy(() => import('./pages/matriculas-detail'))

function PrivateRoute(props) {
    const hasToken = getTokenSession()
    if(hasToken) return <Route {...props} />
    return <Redirect to='/login' />
}

function Loading() {
    return (
        <div className='centerLoading'>
            <CircularProgress />
        </div>
    )
}

function MainRouter() {
    //ESTADOS
    const [isLoading, setIsLoading] = useState(true)

    //HOOKS
    const dispatch = useDispatch()
    const authenticated = useSelector((state) => state.user.authenticated)
    const menus = useSelector((state) => state.menu.data)

    function validateAuth() {
        const hasToken = getTokenSession()

        if(hasToken && authenticated) {
            dispatch(menuActions.getMenu())
        }

        if(hasToken && !authenticated) {
            dispatch({
                type: userTypes.DO_LOGIN_SUCCESS,
                payload: hasToken
            })
        }
    }

    const isAllowed = (options, menu) => {
        let allowed;
        const jwtDecoded = decodeToken()
        options.forEach((option) => {
          // validar que el rol del usuario exista dentro del arreglo de roles del menu y luego validar que haga match el nombre del Path
          if (option.roles.includes(jwtDecoded.roles[0]) && option.nombre === menu) {
            allowed = true;
          }
        })
        return allowed
    }
      
    useEffect(() => {
        setIsLoading(false)
    }, [])

    useEffect(() => {
        validateAuth()
    }, [authenticated])

    return isLoading ? <Loading /> : (
        <Router>
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/not-permisioned' component={() => <div>No tienes permisos</div>} />
                    {authenticated && menus && menus.length > 0 && (
                        <>
                        <PrivateRoute exact path='/' component={Home} />
                        <PrivateRoute exact path='/estudiantes' component={Estudiantes} />
                        <PrivateRoute exact path='/cursos' component={Cursos} />
                        {isAllowed(menus, 'Matriculas') ? (
                            <PrivateRoute exact path='/matriculas' component={Matriculas} />
                        ) : <PrivateRoute exact path='/matriculas' component={() => <Redirect to='/not-permisioned' />} />}
                        {isAllowed(menus, 'Matriculas') ? (
                            <PrivateRoute exact path='/matriculas/:id' component={MatriculasDetail} />
                        ) : <PrivateRoute exact path='/matriculas/:id' component={() => <Redirect to='/not-permisioned' />} />}
                        {isAllowed(menus, 'Crear Matriculas') ? (
                            <PrivateRoute exact path='/newMatricula' component={MatriculasCreate} />
                        ) : <PrivateRoute exact path='/newMatricula' component={() => <Redirect to='/not-permisioned' />} />}
                        </>
                    )}
                </Switch>
            </Suspense>
        </Router>
    );
}

export default MainRouter