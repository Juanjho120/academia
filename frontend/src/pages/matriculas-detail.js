import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Layout from '../components/layout'
import { format } from 'date-fns'
import { useEffect, useState } from "react"
import * as matriculaActions from '../redux/actions/matricula'
import { CircularProgress } from '@material-ui/core'

function MatriculasDetail() {
    const [loading, setLoading] = useState(true)

    //HOOKS
    const dispatch = useDispatch()
    const detailMatricula = useSelector((state) => state.matricula.matriculaItem.data)
    const params = useParams()

    //FUNCIONES
    const loadData = () => {
        function fnCallback() {
            setLoading(false)
        }
        dispatch(matriculaActions.getMatriculaById(params.id, fnCallback))
    }

    useEffect(() => {
        loadData()
    }, [])

    if (loading) {
        return (
          <div className='centerLoading'>
            <CircularProgress />
          </div>
        )
    }

    return (
        <Layout>
            <div className='detailMatricula'>
                <div className='titleArea'>
                    Datos Estudiante
                </div>
                <div className='boxArea'>
                    Nombre: {detailMatricula.estudiante.nombres} {detailMatricula.estudiante.apellidos} <br />
                    Edad: {detailMatricula.estudiante.edad} <br />
                    DNI: {detailMatricula.estudiante.dni} <br />
                </div>
                <div className='titleArea'>
                    Datos Matricula
                </div>
                <div className='boxArea'>
                    Fecha: {format(new Date(detailMatricula.fechaMatricula), 'MM/dd/yyyy')}
                </div>
                <div className='titleArea'>
                    Cursos
                </div>
                <div className='boxArea'>
                    <div className='listCursos_head'>
                        <div className='listCursos_head--item'>
                            <b>Siglas</b>
                        </div>
                        <div className='listCursos_head--item'>
                            <b>Nombre</b>
                        </div>
                    </div>
                    <div className='listCursos_body'>
                        {detailMatricula.cursos.map((c) => (
                            <div className='listCursos_body--row'>
                                <div className='listCursos_body--column'>
                                    {c.siglas}
                                </div>
                                <div className='listCursos_body--column'>
                                    {c.nombre}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MatriculasDetail