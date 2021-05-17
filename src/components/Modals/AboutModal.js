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
                aria-labelledby="What is 2X?"
                aria-describedby="Description of 2X and the technology used to build it"
            >
                <DialogTitle id="2X is a decentralized application">{"What is 2X?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="Desrcibe 2X's function/purpose">
                        2X is a decentralized application (dApp) that allows 
                        users to wager ether in a 1v1 winner-take-all gamble.
                    </DialogContentText>
                    <DialogContentText id="Describe how 2X is secure">
                        These wagers are secured by the Ethereum Blockchain 
                        and randomness is provided via an Oracle created and 
                        maintained by {
                                <Link 
                                    href="https://blog.chain.link/verifiable-random-functions-vrf-random-number-generation-rng-feature/"
                                    color="inherit">
                                    Chainlink.
                                </Link>
                            }
                    </DialogContentText>
                    <DialogContentText id="Describe the smart contracts which handle logic">
                        Two smart contracts (Wager.sol & WagerStore.sol)
                        written in Solidity handle all of the logic behind 2X.
                        The WagerStore contract deploys Wager contracts on behalf of
                        the user.
                    </DialogContentText>
                    <DialogContentText id="Describe how to check deployed Wager contracts">
                        All deloyed Wager contracts can be seen on
                        Etherscan by searching the "Wager Address" provided within each
                        Wager Card.
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