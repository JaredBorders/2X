//import { useState } from 'react';
import { ethers } from 'ethers';
import WagerStore from '../artifacts/contracts/WagerStore.sol/WagerStore.json';
import {
    Container,
    Typography,
    TextField,
    Grid,
    Button,
    makeStyles,
    InputAdornment,
} from '@material-ui/core';
import WagerCard from '../components/WagerCard';

const useStyles = makeStyles({
    main: {
        justifyContent: "center",
        textAlign: "center",
        minHeight: "90vh",
        marginTop: 36,
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
        marginTop: 36,
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

        /* request access to the user's MetaMask account */
        async function requestAccount() {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        }

        /* Fetch all deployed wagers created by WagerStore */
        // async function getDeployedWagers() {
        //     if (typeof window.ethereum !== 'undefined') {
        //         const provider = new ethers.providers.Web3Provider(window.ethereum);
        //         const contract = new ethers.Contract(wagerStoreAddress, WagerStore.abi, provider);
        //         try {
        //             const data = await contract.getWagers();
        //             console.log('data: ', data);
        //         } catch (err) {
        //             console.log("Error: ", err);
        //         }
        //     }
        // }

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
                    <Grid container spacing={4} justify="center">
                        <Grid item xs={12}>
                            <Typography variant="h1" color="secondary">2X</Typography>
                            <Typography variant="overline">{description}</Typography>
                            <Typography style={{ borderBottom: '0.1rem solid white', padding: '0.5em' }}></Typography>
                        </Grid>
                        <div className={classes.actionContainer}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Amount"
                                    variant="filled"
                                    color="secondary"
                                    className={classes.textField}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                    }}
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
                            <WagerCard address={"0x3D4...19"} amount={"0.19"} dateCreated={"05-01-21@03:25(CT)"} dateExpires={"05-05-21@16:25(CT)"} />
                            <WagerCard address={"0x504...77"} amount={"0.149"} dateCreated={"04-29-21@02:54(CT)"} dateExpires={"04-29-21@07:54(CT)"}/>
                            <WagerCard address={"0x6FF...4B"} amount={"0.9"} dateCreated={"04-29-21@01:25(CT)"} dateExpires={"04-29-21@06:25(CT)"}/>
                            <WagerCard address={"0xF1F...F0"} amount={"1.00"} dateCreated={"04-24-21@05:11(CT)"} dateExpires={"04-26-21@05:11(CT)"}/>
                            <WagerCard address={"0x1AC...01"} amount={"1.54"} dateCreated={"04-22-21@01:00(CT)"} dateExpires={"04-24-21@01:00(CT)"}/>
                            <WagerCard address={"0x191...AA"} amount={"15.00"} dateCreated={"04-09-21@07:48(CT)"} dateExpires={"04-09-21@07:58(CT)"}/>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }

    export default Splash;