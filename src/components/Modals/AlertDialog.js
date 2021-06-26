import {Button, makeStyles} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Splash from '../../pages/Splash'

const useStyles = makeStyles((theme) => ({
    btn: {
        color: 'white'
    },
    dialogContainer: {
        width: '200px'
    },
    btnFlex: {
        display: 'flex',
        justifyContent: 'spaceAround'
    }
  }));

  const AlertDialog = (props) => {
    const classes = useStyles();
    //find out how to access wagerAmount in this component 
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'You are about to challenge this wager for'}</DialogTitle>
        <DialogActions>
        <div className={classes.btnFlex}>
            <Button color={'inherit'} onClick={props.userAgrees} size="large" color="inherit" autoFocus>
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