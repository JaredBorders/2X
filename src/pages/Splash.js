import { useState } from "react";
import { ethers } from "ethers";
import WagerStore from "../artifacts/contracts/WagerStore.sol/WagerStore.json";
import {
    Container,
    Typography,
    TextField,
    Grid,
    Button,
    makeStyles,
    InputAdornment,
    Divider,
} from "@material-ui/core";
import dayjs from "dayjs";
import WagerCard from "../components/WagerCard";

const useStyles = makeStyles({
    main: {
        justifyContent: "center",
        textAlign: "center",
        minHeight: "90vh",
        marginTop: 100,
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
    textField: {
        fontWeight: 500,
        width: 250,
    },
    actionContainer: {
        marginTop: 24,
        marginBottom: 36
    },
    wagersContainer: {
        margin: 1,
        width: 16,
        height: 16,
    }
});

// Address contract(s) was/were deployed to via $ npx hardhat run scripts/deploy.js {network}
const wagerStoreAddress = "0x38E88FFcfC3f921cf98002D39840A5B3C5d3a961";

// Description text for 2X
const description = "Wager ether that can be matched by anyone in a winner-take-all 1v1"

const Splash = (props) => {
    const classes = useStyles();

    /* Wager state variables */
    const [wagerAmount, setWagerAmount] = useState();
    const [wagersData, setWagersData] = useState([]);

    const handleAmountChange = (e) => {
        setWagerAmount(e.target.value);
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
                contractDuration: 600, // Code change: currently unused
                contractCreated: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                contractExpires: dayjs().add(10, 'minute').format("YYYY-MM-DD HH:mm:ss")
            };
            setWagersData([...wagersData, wagerData]);
        }
    }

    return (
        <Container maxWidth="md">
            <div className={classes.main}>
                <Grid container spacing={4} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h1" color="secondary">2X</Typography>
                        <Typography variant="overline">{description}</Typography>
                        <div className={classes.divide}>
                            <Divider dark />
                        </div>
                    </Grid>
                    <div className={classes.actionContainer}>
                        <Grid item xs={12}>
                            <TextField
                                label="Amount"
                                variant="filled"
                                color="secondary"
                                type="number"
                                className={classes.textField}
                                value={wagerAmount}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                }}
                                onChange={handleAmountChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                className={classes.button}
                                variant="outlined"
                                color="secondary"
                                onClick={createWager}>
                                Make Wager
                            </Button>
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
                                    dateExpires={wager.contractExpires} />
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default Splash;