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
                            Answer: MetaMask allows users to store and manage account keys, broadcast transactions, 
                            send and receive Ethereum-based cryptocurrencies and tokens, and 
                            securely connect to decentralized applications through a compatible 
                            web browser or the mobile app's built-in browser.
                        </DialogContentText>
                        <DialogContentText id="Are wagers final">
                            Question: Are wagers final?
                        </DialogContentText>
                        <DialogContentText id="Explain the way wagers work">
                            Answer: If your wager has been challenged, then that transaction is 
                            irreversible. However, if your wager has not been challenged,
                            you can withdraw the amount wagered back to your account, thereby canceling the wager.
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