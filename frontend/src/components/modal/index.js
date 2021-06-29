import { Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button } from '@material-ui/core'

function Modal(props) {
    return (
        <Dialog 
            open={props.openDialog} 
            maxWidth='xs'
            fullWidth
            aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                    <DialogContent>

                    {props.children}

                    </DialogContent>
                    <DialogActions>
                    <Button onClick={props.onCancel} variant='contained' color="warn">
                        Cancelar
                    </Button>
                    <Button onClick={props.onConfirm} variant='contained' color="primary">
                        {props.buttonConfirmName}
                    </Button>
                    </DialogActions>
                </Dialog>
    )
}

export default Modal