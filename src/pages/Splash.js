//import { useState } from 'react';
import { ethers } from 'ethers';
import WagerStore from '../artifacts/contracts/WagerStore.sol/WagerStore.json';
import {
    Container,
    Typography,
    TextField,
    Grid,
    Button,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
    main: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "90vh",
    },
    button: {
        color: "white",
        height: 48,
        width: 200,
        padding: "30px",
        margin: 5,
    },
    centerText: {
        textAlign: "center"
    },
    textField: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: 500,
        width: 200,
    },
    input: {
        color: "white",
        style: { textAlign: 'center' },
    },
});

// Address contract(s) was/were deployed to via $ npx hardhat run scripts/deploy.js {network}
const wagerStoreAddress = "0x38E88FFcfC3f921cf98002D39840A5B3C5d3a961";

const Splash = (props) => {
    const classes = useStyles();

    /* request access to the user's MetaMask account */
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    /* Fetch all deployed wagers created by WagerStore */
    async function getDeployedWagers() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(wagerStoreAddress, WagerStore.abi, provider);
            try {
                const data = await contract.getWagers();
                console.log('data: ', data);
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }

    /* Deploy new wager contract */
    async function createWager() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(wagerStoreAddress, WagerStore.abi, signer);
            const transaction = await contract.createWagerContract();
            await transaction.wait();
            console.log("Wager contract deployed to: " + contract.address);
        }
    }

    return (
        <Container maxWidth="md">
            <div className={classes.main}>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h1" color="secondary">2X</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className={classes.button}
                            variant="outlined"
                            color="secondary"
                            onClick={createWager}>
                            New Wager
                        </Button>
                        <Button
                            className={classes.button}
                            variant="outlined"
                            color="secondary"
                            onClick={getDeployedWagers}>
                            See All Wagers
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder="Wager Amount"
                            variant="outlined"
                            color="secondary"
                            className={classes.textField}
                            InputProps={{
                                className: classes.input,
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

export default Splash;
