import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/layout'
import * as estudianteActions from '../redux/actions/estudiante'
import ErrorState from '../components/errorState'
import LoadingState from '../components/loadingState'
import EmptyState from '../components/emptyState'
import React from 'react'
import Modal from '../components/modal'
import { Button, TextField, Grid, ListItem, ListItemAvatar, ListItemText, List, Typography, Avatar, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';

const DEFAULT_FORM = {
    nombres: '',
    apellidos: '',
    dni: '',
    edad: 0
}

const DEFAULT_OBJECT = {}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: 0,
    },
  }));

function Estudiantes() {
    //ESTADOS
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [formValues, setFormValues] = useState(DEFAULT_FORM)
    const [selectedItem, setSelectedItem] = useState(DEFAULT_OBJECT)

    //HOOKS
    const dispatch = useDispatch()
    const storeEstudiantes = useSelector((state) => state.estudiante)
    const classes = useStyles();

    //FUNCIONES
    const getEstudiantes = () => {
        dispatch(estudianteActions.getListEstudiantes())
    }

    const clearEstudiantes = () => {
        dispatch(estudianteActions.clearListEstudiantes())
    }

    const onAddNew = () => {
        setOpenDialog(true)
        setSelectedItem(DEFAULT_OBJECT)
        setFormValues(DEFAULT_FORM)
    }

    const onDelete = (item) => {
        setSelectedItem(item)
        setOpenDialogDelete(true)
    }

    const onEdit = (item) => {
        setOpenDialog(true)
        setFormValues({
            nombres: item.nombres,
            apellidos: item.apellidos,
            dni: item.dni,
            edad: item.edad
        })
        setSelectedItem(item)
    }

    const onCancelModal = () => {
        setOpenDialog(false)
        setOpenDialogDelete(false)
    }

    const onConfirm = () => {
        if(selectedItem.id) {
            dispatch(estudianteActions.editEstudiante(formValues, selectedItem.id))
        } else {
            dispatch(estudianteActions.addNewEstudiante(formValues))
        }
        setOpenDialog(false)
        setFormValues(DEFAULT_FORM)
    }

    const onChangeInput = (e) => {
        const value = e.target.value
        const idName = e.target.id

        setFormValues((state) => {
            return {
                ...state,
                [idName]: value
            }
        })

    }

    const onConfirmDelete = () => {
        dispatch(estudianteActions.deleteEstudiante(selectedItem.id))
        setOpenDialogDelete(false)
    }

    const renderModal = () => {
        return (
            <Modal 
                openDialog={openDialog}
                onCancel={onCancelModal}
                title={`${selectedItem.id ? 'Editar' : 'Agregar nuevo'} estudiante`}
                onConfirm={onConfirm}
                buttonConfirmName={`${selectedItem.id ? 'Editar' : 'Agregar'}`}
            >
                <TextField 
                    autoFocus
                    margin='dense'
                    id='nombres'
                    label='Ingresar nombres'
                    type='text'
                    fullWidth
                    onChange={onChangeInput}
                    value={formValues.nombres}
                />
                <br />
                <TextField 
                    autoFocus
                    margin='dense'
                    id='apellidos'
                    label='Ingresar apellidos'
                    type='text'
                    fullWidth
                    onChange={onChangeInput}
                    value={formValues.apellidos}
                />
                <br />
                <TextField 
                    autoFocus
                    margin='dense'
                    id='dni'
                    label='Ingresar DNI'
                    type='text'
                    fullWidth
                    onChange={onChangeInput}
                    value={formValues.dni}
                />
                <br />
                <TextField 
                    autoFocus
                    margin='dense'
                    id='edad'
                    label='Ingresar edad'
                    type='number'
                    fullWidth
                    onChange={onChangeInput}
                    value={formValues.edad}
                />
            </Modal>
        )
    }

    const renderModalDelete = () => {
        return (
            <Modal 
                openDialog={openDialogDelete}
                onCancel={onCancelModal}
                title='Eliminar estudiante'
                onConfirm={onConfirmDelete}
                buttonConfirmName='Eliminar'
            >
               ¿Está seguro que desea eliminar el estudiante?
            </Modal>
        )
    }

    useEffect(() => {
        getEstudiantes()
        //Al desmontar el componente
        return () => clearEstudiantes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isEmpty = (storeEstudiantes.data === null || storeEstudiantes.data.length === 0) && !storeEstudiantes.loading
    const isLoading = storeEstudiantes.loading
    const isError = storeEstudiantes.error.error

    if(isEmpty) {
        return (
            <React.Fragment>
                <EmptyState 
                    message='No se encontraron estudiantes'
                    onAdd={onAddNew}
                    icon='/search.png'
                />
                {renderModal()}
            </React.Fragment>
        )
    }
    if(isLoading) return <LoadingState />
    if(isError) return <ErrorState message={storeEstudiantes.error.message} />

    return (
        <Layout>
            <Grid item xs={12} md={12}>
                <Grid justify='center' alignItems='center' container xs={12} md={12}>
                    <Grid item xs={6}>
                        <Typography variant="h6" className={classes.title}>
                            Lista de estudiantes
                        </Typography>
                    </Grid>
                    <Grid style={{ textAlign: 'right' }} item xs={6}>
                        <Button variant='contained' color='primary' onClick={onAddNew}>
                            Agregar nuevo
                        </Button>
                    </Grid>
                </Grid>
                <br />
                <div className={classes.demo}>
                    <List dense={false}>
                        {storeEstudiantes.data.map((estudiante) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary= {`${estudiante.nombres} ${estudiante.apellidos}`}
                                    secondary={`Edad: ${estudiante.edad} - DNI: ${estudiante.dni} `}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => onEdit(estudiante)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(estudiante)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Grid>
            {renderModal()}
            {renderModalDelete()}
        </Layout>
    )
}

export default Estudiantes