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

const FAQModal = () => {
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
                FAQ
                            </Button>
            <Dialog
                open={faqOpen}
                onClose={handleFaqClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"FAQ"}</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText id="alert-dialog-description">
                            Question: Why do I need a wallet? Answer: A user needs a metamask
                            wallet to automatically manage their public/private keys and
                            cryptocurrency which 2X interacts with (with your permission)
                            to pay gas fees and place/challenge new wagers.
                </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            Question: Are wagers final? Answer: Once placed, the wager cannot
                            be canceled. However, after the duration period set by you expires,
                            2X sends back funds to the address who created the wager.
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

export default FAQModal;