import { useState } from "react";
import { ethers } from "ethers";
import WagerStore from "../artifacts/contracts/WagerStore.sol/WagerStore.json";
import { ReactComponent as BigLogo } from '../designs/bigLogo.svg';
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
} from "@material-ui/core";
import dayjs from "dayjs";
import WagerCard from "../components/WagerCard";

const useStyles = makeStyles((theme) => ({
    main: {
        justifyContent: "center",
        textAlign: "center",
        minHeight: "90vh",
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
    }
}));

// Address contract(s) was/were deployed to via $ npx hardhat run scripts/deploy.js {network}
const wagerStoreAddress = "0x38E88FFcfC3f921cf98002D39840A5B3C5d3a961";

// Description text for 2X
const description = "Make wagers that can be matched by anyone in a winner-take-all 1v1"

const Splash = (props) => {
    const classes = useStyles();

    /* Wager state variables */
    const [wagerAmount, setWagerAmount] = useState();
    const [wagerDuration, setWagerDuration] = useState();
    const [wagersData, setWagersData] = useState([]);
    const [wagerFormOpen, setWagerFormOpen] = useState(false);

    /* Amount TextField validation */
    const handleAmountChange = (e) => {
        setWagerAmount(e.target.value);
    }

    /* Wager Form Modal Dialog */
    const onMakeWagerBtnPressed = () => {
        clearWagerInfo();
        setWagerFormOpen(true);
    };

    const handleWagerDurationChange = (e) => {
        setWagerDuration(e.target.value);
    }

    const onFinalizeWagerPressed = () => {
        createWager();
        setWagerFormOpen(false);
        clearWagerInfo();
        // Set loading ...
    };

    const onCancelPressed = () => {
        setWagerFormOpen(false);
        clearWagerInfo();
    }

    function clearWagerInfo() {
        setWagerAmount();
        setWagerDuration();
    }

    /* request access to the user's MetaMask account */
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    /* Deploy new wager contract */
    async function createWager() {
        if (typeof window.ethereum !== 'undefined') {
            // await requestAccount();
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const contract = new ethers.Contract(wagerStoreAddress, WagerStore.abi, signer);
            // const transaction = await contract.createWagerContract();

            /* Create object to represent wager information */
            const wagerData = {
                wagererAddress: "transaction",
                contractAddress: "transaction",
                wagerAmount: wagerAmount,
                contractDuration: 3600 * wagerDuration, // 8400 seconds / day
                contractCreated: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                contractExpires: dayjs().add(wagerDuration, 'hour').format("YYYY-MM-DD HH:mm:ss")
            };
            setWagersData([...wagersData, wagerData]);
        }
    }

    return (
        <Container maxWidth="md">
            <div className={classes.main}>
                <Grid container spacing={4} justify="center">
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <BigLogo width="400px" height="400px" />
                        </Grid>
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
                                    <Button
                                        className={classes.dialogButton}
                                        variant="outlined"
                                        onClick={onFinalizeWagerPressed}>
                                        Finalize Wager
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </div>
                    <Grid item xs={12}>
                        <Typography variant="h5">Open Wagers</Typography>
                    </Grid>
                    <Grid container spacing={36} justify="center">
                        {wagersData.map(wager => {
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
            </div>
        </Container>
    );
}

export default Splash;