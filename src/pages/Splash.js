import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WagerFactory from "../artifacts/contracts/WagerFactory.sol/WagerFactory.json";
import Wager from "../artifacts/contracts/Wager.sol/Wager.json";
import { ReactComponent as BigLogo } from '../designs/bigLogo.svg';
import MuiAlert from '@material-ui/lab/Alert';
import dayjs from "dayjs";
import WagerCard from "../components/WagerCard";
import {
    Container,
    Typography,
    TextField,
    Grid,
    Button,
    makeStyles,
    InputAdornment,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    FormControl,
    InputLabel,
    Select,
    Snackbar,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    main: {
        justifyContent: "center",
        textAlign: "center",
        marginTop: 50,
    },
    divide: {
        marginTop: 26,
    },
    button: {
        color: "white",
        height: 58,
        width: 250,
        marginTop: 16,
    },
    dialogFieldLayout: {
        direction: "column",
        alignItems: "center",
        justify: "center",
    },
    dialogButton: {
        color: "white",
        height: 58,
        width: 250,
        marginTop: 16,
    },
    dialogActions: {
        justifyContent: "center",
    },
    textField: {
        fontWeight: 500,
        width: 250,
    },
    formControl: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },
    actionContainer: {
        marginBottom: 36
    },
    wagersContainer: {
        margin: 1,
        width: 16,
        height: 16,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

/* Address contract(s) was/were deployed to via $ npx hardhat run scripts/deploy.js {network} */
const wagerFactoryAddress = "0x38361E003e5FF4f68c067a1833E14866b858A204"; // Currently network === kovan

/* Description text for 2X */
const description = "The Ethereum Blockchain provides a perfect ecosystem for trustless and highly secure gambling. " +
    "2X leverages this technology to allow users to make 1v1, winner-take-all wagers that can be matched " +
    "by anybody with a Metamask wallet."

/* Alert message */
const alertText = "Wallet not detected! To use this app, please install Metamask."

const Splash = () => {
    const classes = useStyles();

    /* Create Wager form state */
    const [wagerFormOpen, setWagerFormOpen] = useState(false);

    /* Create Wager state variables */
    const [wagerAmount, setWagerAmount] = useState();
    const [wagerDuration, setWagerDuration] = useState();

    /* Wager data */
    const [wagers, setWagers] = useState([]);

    /* Wallet state */
    const [hasWallet, seHasWallet] = useState(false);

    /* Snackbar Alert state */
    const [alertOpen, setAlertOpen] = useState(false);

    /* Progress Indicator */
    const [inProgress, setInProgress] = useState(false);
    const [progressDescription, setProgressDescription] = useState("");

    /* Does user have a wallet? */
    useEffect(() => {
        checkConnection();
    });

    /* Fetches Wager addresses from factory; only called on the component's first render */
    useEffect(() => {
        fetchValidWagerContracts();
    }, []);

    /* Fetch and filter valid Wager contracts and update wagers state variable */
    const fetchValidWagerContracts = async () => {
        if (typeof window.ethereum !== 'undefined') {
            setProgressDescription("Loading available wagers...");
            setInProgress(true);

            /* Instantiate provider & signer to establish interaction with WagerFactory */
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const factory = new ethers.Contract(wagerFactoryAddress, WagerFactory.abi, provider);
            const addresses = await factory.getWagers();

            var _wagers = []; // used to temporarily hold Wager contract data
            setWagers(_wagers); // wipe previous state variable data

            for (const i in addresses) {
                try {
                    /* Establish interaction with new Wager @ addresses[i] and fetch relevant data */
                    const wager = new ethers.Contract(addresses[i], Wager.abi, provider)
                    const data = await wager.getWagerData();

                    /* Used to calculate user facing duration data */
                    const blockTime = await provider.getBlock().then(function (block) {
                        return block.timestamp; // timestamp used in Wager contract when setting duration
                    });
                    const timeUntilExpiration = Math.ceil((data[2].toNumber() - blockTime) / 3600);

                    if (timeUntilExpiration > 0) {
                        /* Create object to represent Wager information */
                        const wagerData = {
                            key: blockTime + addresses[i],
                            wagererAddress: data[0].substring(0, 10).toLowerCase() + "...",
                            contractAddress: addresses[i],
                            contractAddressFormatted: addresses[i].substring(0, 10).toLowerCase() + "...",
                            wagerAmount: ethers.utils.formatEther(data[1]),
                            contractDuration: timeUntilExpiration,
                            contractExpires: dayjs().add(timeUntilExpiration, 'hour').format("YYYY-MM-DD HH:mm:ss")
                        };

                        _wagers.push(wagerData);
                    }
                } catch (error) {
                    console.log("Issue fetching wagers: " + error);
                }
            }
            setWagers(_wagers); // set wagers state to all new data just fetched. Could NOT do this within for-loop
            setInProgress(false);
            setProgressDescription("");
        }
    }

    /* Challenge existing Wager */
    const challengeWager = async (address, wagerAmount) => {
        const delay = t => new Promise(res => setTimeout(res, t));

        if (typeof window.ethereum !== 'undefined') {
            setProgressDescription("Challenging wager @ address: " + address);
            setInProgress(true);

            var provider = null;
            var signer = null;
            var wager = null;
            var signerAddress = null;

            try {
                try {
                    /* Establish Wager contract to interact with via it's deployment address */
                    provider = new ethers.providers.Web3Provider(window.ethereum);
                    signer = provider.getSigner(); // Needed for paying eth
                    wager = new ethers.Contract(address, Wager.abi, signer);
                    signerAddress = await signer.getAddress();
                } catch (error) {
                    setProgressDescription("There was an issue with provider, signer, wager, signerAddress...");
                await delay(5000);
                }
                /* Attempt to enter Wager contract at address given */
                const tx = await wager.challenge(signerAddress, {
                    value: ethers.utils.parseEther(wagerAmount)
                });
                await tx.wait();

            } catch (error) {
                setProgressDescription("There was an issue with your transaction. Try again or contact a developer for help.");
                console.log(error);
                await delay(5000);
            }

            fetchValidWagerContracts();
        }
    }

    /* Deploy new wager contract */
    const createWager = async () => {
        if (typeof window.ethereum !== 'undefined') {
            setProgressDescription("Factory creating new wager...");
            setInProgress(true);

            await requestAccount(); // is this needed?

            /* Instantiate provider & signer to establish interaction with WagerFactory */
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(); // Needed for paying eth
            const factory = new ethers.Contract(wagerFactoryAddress, WagerFactory.abi, signer);

            /* Deploy new Wager contract from Factory and record it's deployment address */
            const tx = await factory.createWagerContract();
            const res = await tx.wait();
            const wagerAddress = res.events[0].args[0]; // Event reveals deployement address

            /* Establish Wager contract to interact with via it's deployment address */
            const newWager = new ethers.Contract(wagerAddress, Wager.abi, signer);

            setProgressDescription("Establishing wager with specified amount and duration...");
            /* Establish the finalized wager details */
            const tx2 = await newWager.establishWager(wagerDuration * 60 * 60, {
                value: ethers.utils.parseEther(wagerAmount)
            });
            setProgressDescription("Waiting for transaction to be added to the blockchain...");
            await tx2.wait();

            /* Update list of valid Wager contracts */
            fetchValidWagerContracts();
        }
    }

    /* Amount TextField validation */
    const handleAmountChange = (e) => {
        setWagerAmount(e.target.value);
    }

    /* Wager Form Modal */
    const onMakeWagerBtnPressed = () => {
        if (!hasWallet) {
            // Alert user again when they try to make wager
            setAlertOpen(true);
        }
        clearWagerInfo();
        setWagerFormOpen(true);
    };

    const handleWagerDurationChange = (e) => {
        setWagerDuration(e.target.value);
    }

    const onFinalizeWagerPressed = async () => {
        createWager();
        setWagerFormOpen(false);
        clearWagerInfo();
    };

    const onCancelPressed = () => {
        setWagerFormOpen(false);
        clearWagerInfo();
    }

    /* Helper: Clear out all field data in modal */
    const clearWagerInfo = () => {
        setWagerAmount();
        setWagerDuration();
    }

    /* request access to the user's MetaMask account */
    const requestAccount = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    /* Check if browser is running Metamask */
    const checkConnection = async () => {
        if (window.ethereum || window.web3) {
            seHasWallet(true);
        } else {
            setAlertOpen(true);
        }
    };

    /* Alert component & handler */
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <Container maxWidth="md">
            <div className={classes.main}>
                <Snackbar open={alertOpen} autoHideDuration={12000} onClose={handleAlertClose}>
                    <Alert onClose={handleAlertClose} severity="error">
                        {alertText}
                    </Alert>
                </Snackbar>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={12}>
                        <BigLogo width="350px" height="350px" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="overline">{description}</Typography>
                        <div className={classes.divide}>
                            <Divider dark="true" />
                        </div>
                    </Grid>
                    <div className={classes.actionContainer}>
                        <Grid item xs={12}>
                            <Button
                                className={classes.button}
                                variant="outlined"
                                color="secondary"
                                onClick={onMakeWagerBtnPressed}>
                                Make Wager
                            </Button>
                            <Dialog
                                open={wagerFormOpen}
                                onClose={onCancelPressed}
                                className={classes.dialog}
                                aria-labelledby="Specify wager details"
                                aria-describedby="Set wager amount and duration and then confirm or cancel"
                            >
                                <DialogTitle>{"Specify Wager Details"}</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        className={classes.formControl}
                                        label="Amount"
                                        color="secondary"
                                        variant="filled"
                                        type="number"
                                        value={wagerAmount}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                        }}
                                        onChange={handleAmountChange}
                                    />
                                    <FormControl color="secondary" variant="filled" className={classes.formControl}>
                                        <InputLabel htmlFor="filled-age-native-simple">Duration (Hours)</InputLabel>
                                        <Select
                                            native
                                            value={wagerDuration}
                                            onChange={handleWagerDurationChange}
                                            inputProps={{
                                                name: 'duration',
                                                id: 'filled-age-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                        </Select>
                                    </FormControl>
                                </DialogContent>
                                <DialogActions className={classes.dialogActions}>
                                    <Button
                                        className={classes.dialogButton}
                                        variant="outlined"
                                        onClick={onCancelPressed}>
                                        Cancel
                                    </Button>
                                    {hasWallet ? (
                                        <Button
                                            className={classes.dialogButton}
                                            variant="outlined"
                                            onClick={onFinalizeWagerPressed}>
                                            Finalize Wager
                                        </Button>
                                    ) : (
                                        <Button
                                            className={classes.dialogButton}
                                            variant="outlined"
                                            onClick={onFinalizeWagerPressed}
                                            disabled>
                                            Finalize Wager
                                        </Button>
                                    )}
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </div>
                    <Grid item xs={12}>
                        <Typography variant="h5">Open Wagers</Typography>
                    </Grid>
                    <Grid container justify="center">
                        {wagers.map(wager => {
                            return (
                                <WagerCard
                                    key={wager.key}
                                    wagererAddress={wager.wagererAddress}
                                    contractAddress={wager.contractAddress}
                                    contractAddressFormatted={wager.contractAddressFormatted}
                                    amount={wager.wagerAmount}
                                    dateCreated={wager.contractCreated}
                                    dateExpires={wager.contractExpires}
                                    challengeWager={challengeWager}
                                />
                            )
                        })}
                    </Grid>
                </Grid>
                <Backdrop className={classes.backdrop} open={inProgress}>
                    <>
                        <Dialog
                            open={inProgress}
                            aria-labelledby="Progress modal"
                            aria-describedby="Provide description of what is in progress"
                        >
                            <DialogTitle id="Progress Wheel" align="center">
                                <CircularProgress color="inherit" />
                            </DialogTitle>
                            <DialogContent align="center">
                                <DialogContentText id="Description">
                                    {progressDescription}
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </>
                </Backdrop>
            </div>
        </Container>
    );
}

export default Splash;