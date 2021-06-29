import { CircularProgress, 
         List, 
         makeStyles,
         Button,
         MenuItem,
         Select,
         Typography,
         Grid,
         ListItem,
         ListItemSecondaryAction,
         ListItemText,
         IconButton
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/layout'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { format } from 'date-fns'
import * as matriculaActions from '../redux/actions/matricula'
import * as estudianteActions from '../redux/actions/estudiante'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4,8,2)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}))

function Matriculas() {
    const stateMatriculas = useSelector((state) => state.matricula)
    const stateEstudiantes = useSelector((state) => state.estudiante.data)

    //ESTADOS
    const [idSelected, setIdSelected] = useState('')

    //HOOKS
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()

    //FUNCIONES
    const onClearFilter = () => {
        setIdSelected('')
        dispatch(matriculaActions.clearListMatriculasEstudiante())
    }

    const onDetail = (data) => {
        history.push(`/matriculas/${data.id}`)
    }

    const onSearchByEstudiante = () => {
        dispatch(matriculaActions.getListMatriculasByEstudiante(idSelected))
    }

    const handleChange = (event) => {
        setIdSelected(event.target.value)
    }

    const getEstudiantes = () => {
        dispatch(estudianteActions.getListEstudiantes())
    }

    const getMatriculas = () => {
        dispatch(matriculaActions.getListMatriculas())
    }

    const clearEstudiantes = () => {
        dispatch(estudianteActions.clearListEstudiantes())
    }

    const clearMatriculas = () => {
        dispatch(matriculaActions.clearListMatriculas())
    }

    const renderListMatriculas = () => {
        if(stateMatriculas.list.data.length === 0) {
            return <div>No existen matrículas</div>
        }
        return stateMatriculas.list.data.map((data) => (
            <ListItem>
                <ListItemText 
                    primary={format(new Date(data.fechaMatricula), 'MM/dd/yyy')}
                />
                <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='edit' onClick={() => onDetail(data)}>
                        <VisibilityIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))
    }

    const renderListMatriculasByEstudiante = () => {
        if(stateMatriculas.filterList.data.length === 0) {
            return <div>El estudiante no tiene matrículas</div>
        }
        return stateMatriculas.filterList.data.map((data) => (
            <ListItem>
                <ListItemText 
                    primary={format(new Date(data.fechaMatricula), 'MM/dd/yyy')}
                />
                <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='edit' onClick={() => onDetail(data)}>
                        <VisibilityIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))
    }

    useEffect(() => {
        getEstudiantes()
        getMatriculas()
        //Al desmontar el componente
        return () => {
            clearEstudiantes()
            clearMatriculas()
            onClearFilter()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <Grid item xs={12} md={12}>
                <Typography variant='h5' gutterBottom>
                    Lista de Matrículas
                </Typography>
                <div>
                    <Grid container spacing={4}>
                        <Grid item m xs={6}>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                style={{ width: '100%' }}
                                value= {idSelected}
                                onChange={handleChange}    
                            >
                                {stateEstudiantes && stateEstudiantes.map((estudiante) => (
                                    <MenuItem value={estudiante.id}>{estudiante.nombres} {estudiante.apellidos}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Button onClick={onSearchByEstudiante} variant='contained' color='primary'>
                                Buscar
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={onClearFilter} variant='contained'>
                                Limpiar
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <br /><br />
                <div className={classes.demo}>
                    <List dense={false}>
                        {(stateMatriculas.list.loading || stateMatriculas.filterList.loading) && <CircularProgress color='inherit' />}
                        {(stateMatriculas.list.data && stateMatriculas.filterList.data === null) && renderListMatriculas()}
                        {(stateMatriculas.filterList.data !== null) && renderListMatriculasByEstudiante()}
                    </List>
                </div>
            </Grid>
        </Layout>
    )
}

export default Matriculas