import { Button } from '@material-ui/core'
import Layout from '../layout'

const EmptyState = (props) => {
    return (
        <Layout>
            <div style={objStyle.root}>
                <img alt='academia' src={props.icon} style={objStyle.image} />
                <h3>{props.message}</h3>
                <br />
                <Button variant='contained' color='primary' onClick={props.onAdd}>
                    Agregar nuevo
                </Button>
            </div>
        </Layout>
    )
}

const objStyle = {
    root: {
        textAlign: 'center'
    },

    image: {
        width: '80px',
        height: '80px'
    }
}

export default EmptyState