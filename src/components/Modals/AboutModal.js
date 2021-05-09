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

const AboutModal = () => {
    const classes = useStyles();
    const [aboutOpen, setAboutOpen] = useState(false);

    const handleAboutClickOpen = () => {
        setAboutOpen(true);
    };

    const handleAboutClose = () => {
        setAboutOpen(false);
    };

    return (
        <>
            <Button
                className={classes.menuButton}
                color="inherit"
                onClick={handleAboutClickOpen}>
                About
            </Button>
            <Dialog
                open={aboutOpen}
                onClose={handleAboutClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"What is 2X?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        2X is a decentralized application that allows users to wager
                        ether in 1v1 winner-take-all gamble. These wagers are secured by the
                        ethereum blockchain and randomness is provided via an Oracle created/maintained
                        by Chainlink. Two smart contracts written in Solidity manage the
                        creation of wagers and these deployed wagers can be seen on Etherscan.
                        Exisiting wagers can be seen and challenged under the "Open Wager" text.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAboutClose} variant="outlined">
                        Dismiss
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AboutModal;