import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/layout'
import * as cursoActions from '../redux/actions/curso'
import ErrorState from '../components/errorState'
import LoadingState from '../components/loadingState'
import EmptyState from '../components/emptyState'
import React from 'react'
import Modal from '../components/modal'
import { Button, TextField, Grid, ListItem, ListItemAvatar, ListItemText, List, Typography, Avatar, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BookIcon from '@material-ui/icons/Book';

const DEFAULT_FORM = {
    nombre: '',
    siglas: '',
    estado: true
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

function Cursos() {
    //ESTADOS
    const [openDialog, setOpenDialog] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [formValues, setFormValues] = useState(DEFAULT_FORM)
    const [selectedItem, setSelectedItem] = useState(DEFAULT_OBJECT)

    //HOOKS
    const dispatch = useDispatch()
    const storeCursos = useSelector((state) => state.curso)
    const classes = useStyles();

    //FUNCIONES
    const getCursos = () => {
        dispatch(cursoActions.getListCursos())
    }

    const clearCursos = () => {
        dispatch(cursoActions.clearListCursos())
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
            nombre: item.nombre,
            siglas: item.siglas,
            estado: item.estado
        })
        setSelectedItem(item)
    }

    const onCancelModal = () => {
        setOpenDialog(false)
        setOpenDialogDelete(false)
    }

    const onConfirm = () => {
        if(selectedItem.id) {
            dispatch(cursoActions.editCurso(formValues, selectedItem.id))
        } else {
            dispatch(cursoActions.addNewCurso(formValues))
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
        dispatch(cursoActions.deleteCurso(selectedItem.id))
        setOpenDialogDelete(false)
    }

    const renderModal = () => {
        return (
            <Modal 
                openDialog={openDialog}
                onCancel={onCancelModal}
                title={`${selectedItem.id ? 'Editar' : 'Agregar nuevo'} curso`}
                onConfirm={onConfirm}
                buttonConfirmName={`${selectedItem.id ? 'Editar' : 'Agregar'}`}
            >
                <TextField 
                    autoFocus
                    margin='dense'
                    id='nombre'
                    label='Ingresar nombre'
                    type='text'
                    fullWidth
                    onChange={onChangeInput}
                    value={formValues.nombre}
                />
                <br />
                <TextField 
                    autoFocus
                    margin='dense'
                    id='siglas'
                    label='Ingresar siglas'
                    type='text'
                    fullWidth
                    onChange={onChangeInput}
                    value={formValues.siglas}
                />
            </Modal>
        )
    }

    const renderModalDelete = () => {
        return (
            <Modal 
                openDialog={openDialogDelete}
                onCancel={onCancelModal}
                title='Eliminar curso'
                onConfirm={onConfirmDelete}
                buttonConfirmName='Eliminar'
            >
               ¿Está seguro que desea eliminar el curso?
            </Modal>
        )
    }

    useEffect(() => {
        getCursos()
        //Al desmontar el componente
        return () => clearCursos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isEmpty = (storeCursos.data === null || storeCursos.data.length === 0) && !storeCursos.loading
    const isLoading = storeCursos.loading
    const isError = storeCursos.error.error

    if(isEmpty) {
        return (
            <React.Fragment>
                <EmptyState 
                    message='No se encontraron cursos'
                    onAdd={onAddNew}
                    icon='/folder.png'
                />
                {renderModal()}
            </React.Fragment>
        )
    }
    if(isLoading) return <LoadingState />
    if(isError) return <ErrorState message={storeCursos.error.message} />

    return (
        <Layout>
            <Grid item xs={12} md={12}>
                <Grid justify='center' alignItems='center' container xs={12} md={12}>
                    <Grid item xs={6}>
                        <Typography variant="h6" className={classes.title}>
                            Lista de cursos
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
                        {storeCursos.data.map((curso) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BookIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary= {`${curso.nombre}`}
                                    secondary={`Siglas: ${curso.siglas} `}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => onEdit(curso)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(curso)}>
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

export default Cursos