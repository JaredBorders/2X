import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddressModal = (props) => {

    return (
        <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Full Address Copied."}</DialogTitle>

      </Dialog>
    )
}

export default AddressModal;
