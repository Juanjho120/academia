import { 
    MenuItem,
    Grid,
    IconButton,
    Button,
    Select,
    Paper,
    Typography
} from '@material-ui/core'
import Layout from '../components/layout'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import * as estudianteActions from '../redux/actions/estudiante'
import * as cursoActions from '../redux/actions/curso'
import * as matriculaActions from '../redux/actions/matricula'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function MatriculasCreate() {
    const stateCursos = useSelector((state) => state.curso.data)
    const stateEstudiantes = useSelector((state) => state.estudiante.data)

    //ESTADOS
    const [estudiante, setEstudiante] = useState('')
    const [curso, setCurso] = useState('')
    const [cursos, setCursos] = useState([])
    
    //HOOKS
    const dispatch = useDispatch()

    //FUNCIONES
    const getMatriculas = () => {
        dispatch(matriculaActions.getListMatriculas())
    }

    const onAddMatricula = () => {
        function findNameCurso() {
            const objCurso = stateCursos.find((c) => c.id === curso)
            return objCurso.nombre
        }

        function findSiglasCurso() {
            const objCurso = stateCursos.find((c) => c.id === curso)
            return objCurso.siglas
        }

        const existsInCurso = cursos.find((x) => x.id === curso)
        const newArrayCursos = [...cursos]
        if(existsInCurso===null || existsInCurso===undefined) {
            const cursoAux = {
                id: curso,
                nombre: findNameCurso(),
                siglas: findSiglasCurso()
            }
            newArrayCursos.push(cursoAux)
        }

        setCursos(newArrayCursos)
    }

    const onNewMatricula = async() => {
        function transformCursos() {
            return cursos.map((c) => {
                return {
                    "cursos" : {
                        "siglas" : c.siglas,
                        "nombre" : c.nombre
                    }
                }
            })
        }
        const payload = {
            "estudiante" : {
                "id" : estudiante
            },
            "cursos" : transformCursos(),
            "estado": true
        }
        dispatch(matriculaActions.addNewMatricula(payload))
        setEstudiante('')
        setCurso('')
        setCursos([])
    }

    const handleSelectEstudiante = (event) => {
        setEstudiante(event.target.value)
        setCurso('')
        setCursos([])
    }

    const handleSelectCurso = (event) => {
        setCurso(event.target.value)
    }

    const getEstudiantes = () => {
        dispatch(estudianteActions.getListEstudiantes())
    }

    const clearEstudiantes = () => {
        dispatch(estudianteActions.clearListEstudiantes())
    }

    const getCursos = () => {
        dispatch(cursoActions.getListCursos())
    }

    const clearCursos = () => {
        dispatch(cursoActions.clearListCursos())
    }

    const renderCursos = () => {
        return (
            <div className='tableCursos'>
                <div className='tableCursos_head'>
                    <div className='tableCursos_head--item'>
                        <b>Curso</b>
                    </div>
                    <div className='tableCursos_head--item'>
                        <b>Acción</b>
                    </div>
                </div>
                <div className='tableCursos_body'>
                    {cursos.map((curso) => (
                        <div className='tableCursos_body--row'>
                            <div className='tableCursos_body--col'>
                                {curso.siglas} - {curso.nombre}
                            </div>
                            <div className='tableCursos_body--col'>
                                <IconButton color='inherit' onClick={() => null}>
                                    <RemoveCircleIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    useEffect(() => {
        getEstudiantes()
        getCursos()
        getMatriculas()
        //Al desmontar el componente
        return () => {
            clearEstudiantes()
            clearCursos()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <>
                <Typography variant='h5' gutterBottom>
                    Creación de Matrículas
                </Typography>
                <br />
                <Grid container spacing={4}>
                    <Grid item m xs={7}>
                        <Select
                            id='estudiante'
                            style={{ width: '100%' }}
                            value={estudiante}
                            onChange={handleSelectEstudiante}
                        >
                            {stateEstudiantes && stateEstudiantes.map((estudiante) => (
                                <MenuItem value={estudiante.id}>
                                    {estudiante.nombres} {estudiante.apellidos}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={4}>
                    <Grid item m xs={7}>
                        <Select
                            id='curso'
                            style={{ width: '100%' }}
                            value={curso}
                            onChange={handleSelectCurso}
                        >
                            {stateCursos && stateCursos.map((curso) => (
                                <MenuItem value={curso.id}>
                                    {curso.siglas} - {curso.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item m xs={2}>
                        <IconButton color='inherit' onClick={onAddMatricula}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={4}>
                    <Grid item m xs={12}>
                        <Paper elevation={3}>
                            <div style={{ padding: '15px' }}>
                                {cursos.length === 0 && <div>Aún no agregaste ningún curso a la matrícula</div>}
                                {cursos.length > 0 && renderCursos()}
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item m xs={12}>
                        <br />
                        <br />
                        <Button fullWidth onClick={onNewMatricula} variant='contained' color='primary'>
                            Crear matrícula
                        </Button>
                    </Grid>
                </Grid>
                
            </>
        </Layout>
        
    )
}

export default MatriculasCreate