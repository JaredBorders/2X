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
                <DialogTitle id="Frequently asked questions">{"FAQ"}</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText id="Why Metamask">
                            Question: Why do I need Metamask?
                        </DialogContentText>
                        <DialogContentText id="Explain the purpose of Metamask">
                            Answer: A user needs a Metamask wallet to automatically
                            manage their public/private keys and cryptocurrency.
                            Metamask also asks for your explicit permission
                            before spending your currency on gas or for making/challenging
                            wagers.
                        </DialogContentText>
                        <DialogContentText id="Are wagers final">
                            Question: Are wagers final?
                        </DialogContentText>
                        <DialogContentText id="Explain the way wagers work">
                            Answer: Once placed, the wager cannot
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