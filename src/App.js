import { useState } from 'react';
import { ethers } from 'ethers';
import {
  Typography,
  TextField,
  Grid,
  Button,
  makeStyles
} from '@material-ui/core';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#081229',
  },
  button: {
    color: 'white',
    height: 48,
    width: 200,
    padding: '0 30px',
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 500,
    width: 200,
  },
  input: {
    color: 'white'
  },
});

// Address contract(s) was/were deployed to via $ npx hardhat run scripts/deploy.js {network}
const greeterAddress = "0x711D91180F909162f8C2a1111568d59EaA27B807" 

function App() {
  const classes = useStyles()
  // store greeting in local state
  const [greeting, setGreetingValue] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      setGreeting("")
      await transaction.wait()
      fetchGreeting() // console log out new value
    }
  }

  return (
    <Grid
      className={classes.root}
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
        <Typography variant="h1" color="secondary">2X</Typography>
      </Grid>
      <Grid item xs={3}>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={fetchGreeting}>
          Fetch Greeting
          </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={setGreeting}>
          Set Greeting
        </Button>
      </Grid>
      <Grid item xs={3}>
        <TextField
          placeholder="Set greeting"
          variant="outlined"
          color="secondary"
          onChange={e => setGreetingValue(e.target.value)}
          className={classes.textField}
          InputProps={{
            className: classes.input,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default App;
