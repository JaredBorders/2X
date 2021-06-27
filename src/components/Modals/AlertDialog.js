import {Button} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

  const AlertDialog = (props) => {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.DialogPrompt}</DialogTitle>
        <DialogActions>
        <div>
            <Button onClick={props.userAgrees} size="large" color="inherit" autoFocus>
            Accept
          </Button>
          <Button onClick={props.userDisagrees} color="inherit">
            Decline
          </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;