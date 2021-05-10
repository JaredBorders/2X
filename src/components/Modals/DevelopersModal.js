import { useState } from "react";
import {
    makeStyles,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Link,
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
                <DialogTitle id="Developer links">{"Developers"}</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText id="Jared Borders">
                            {
                                <Link 
                                    href="https://github.com/JaredBorders" 
                                    color="inherit">
                                    Jared Borders
                                </Link>
                            }
                        </DialogContentText>
                        <DialogContentText id="Austin Robinson">
                            {
                                <Link 
                                    href="https://github.com/84bluedevil" 
                                    color="inherit">
                                    Austin Robinson
                                </Link>
                            }
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