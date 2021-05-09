import { useState } from "react";
import {
    makeStyles,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    menuButton: {
        padding: "16px",
        marginRight: 16,
    },
}));

const DevelopersModal = () => {
    const classes = useStyles();
    const [faqOpen, setFaqOpen] = useState(false);

    const handleFaqClickOpen = () => {
        setFaqOpen(true);
    };

    const handleFaqClose = () => {
        setFaqOpen(false);
    };

    return (
        <>
            <Button
                className={classes.menuButton}
                color="inherit"
                onClick={handleFaqClickOpen}>
                Developers
            </Button>
            <Dialog
                open={faqOpen}
                onClose={handleFaqClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Developers"}</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText id="alert-dialog-description">
                            Jared Borders: https://github.com/JaredBorders
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Austin Robinson: https://github.com/84bluedevil
                        </DialogContentText>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFaqClose} variant="outlined">
                        Dismiss
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DevelopersModal;