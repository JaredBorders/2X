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
const wagerFactoryAddress = "0x95a817F29F551f91c6360741260B72d70e03f552"; // Currently network === kovan

/* Description text for 2X */
const description = "The Ethereum Blockchain provides a perfect ecosystem for trustless and highly secure gambling. " +
    "2X leverages this technology to allow users to make 1v1, winner-take-all wagers that can be matched " +
    "by anybody with a Metamask wallet."

/* Alert message */
const alertText = "Metamask wallet not detected!"

const Splash = () => {
    const classes = useStyles();

    /* Factory deployed Wager addresses */
    const [wagerAddresses, setWagerAddresses] = useState([]);

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

    /* Does user have a wallet? */
    useEffect(() => {
        checkConnection();
    });

    /* Fetches valid wagers: only called on the component's first render */
    useEffect(() => {
        (async function () {
            await fetchValidWagersFromBlockchain();
        })();
    }, []);

    /* Establish factory and fetch all addresses of currently deployed Wagers */
    const fetchValidWagersFromBlockchain = async () => {
        setInProgress(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const factory = new ethers.Contract(wagerFactoryAddress, WagerFactory.abi, provider);

        const addresses = await factory.getWagers();
        setWagerAddresses(addresses);

        /* Fetch and set wager details for each address */
        for (const i in wagerAddresses) {
            const wager = new ethers.Contract(wagerAddresses[i], Wager.abi, provider)
            const data = await wager.getWagerData();

            const blockTime = await provider.getBlock().then(function (block) {
                return block.timestamp;
            });

            const timeUntilExpiration = Math.ceil((data[2].toNumber() - blockTime) / 3600);

            /* Create object to represent wager information */
            const wagerData = {
                wagererAddress: data[0].substring(0, 10).toLowerCase() + "...",
                contractAddress: wagerAddresses[i].substring(0, 10).toLowerCase() + "...",
                wagerAmount: ethers.utils.formatEther(data[1]),
                contractDuration: timeUntilExpiration,
                contractCreated: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                contractExpires: dayjs().add(timeUntilExpiration, 'hour').format("YYYY-MM-DD HH:mm:ss")
            };

            setWagers([...wagers, wagerData]);
        }
        setInProgress(false);
    };

    /* Deploy new wager contract */
    const createWager = async () => {
        if (typeof window.ethereum !== 'undefined') {
            /* Set to false in call to fetchValidWagersFromBlockchain after wagerAddresses update */
            setInProgress(true);

            await requestAccount();

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(); // Needed for paying eth
            const factory = new ethers.Contract(wagerFactoryAddress, WagerFactory.abi, signer);

            /* Deploy new Wager contract from Factory and record it's deployment address */
            const tx = await factory.createWagerContract();
            const res = await tx.wait();
            const wagerAddress = res.events[0].args[0]; // Event reveals deployement address

            /* Establish Wager contract to interact with via it's deployment address */
            const newWager = new ethers.Contract(wagerAddress, Wager.abi, signer);

            /* Establish the finalized wager details */
            const tx2 = await newWager.establishWager(wagerDuration * 60 * 60, {
                value: ethers.utils.parseEther(wagerAmount)
            });
            await tx2.wait();

            fetchValidWagersFromBlockchain();
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
                            <Divider dark />
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
                    <Grid container spacing={36} justify="center">
                        {wagers.map(wager => {
                            return (
                                <WagerCard
                                    wagererAddress={wager.wagererAddress}
                                    address={wager.contractAddress}
                                    amount={wager.wagerAmount}
                                    dateCreated={wager.contractCreated}
                                    dateExpires={wager.contractExpires}
                                />
                            )
                        })}
                    </Grid>
                </Grid>
                <Backdrop className={classes.backdrop} open={inProgress}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </Container>
    );
}

export default Splash;