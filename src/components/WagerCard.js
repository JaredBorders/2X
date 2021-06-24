import React, {useState} from 'react';
import {
  makeStyles,
  Card,
  CardActions,
  Button,
  Link,
  Typography
} from "@material-ui/core";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import AddressModal from './Modals/AddressModal';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "1.3rem",
    margin: "1rem auto",
    backgroundColor: "#1e273c",
    border: '1px solid #d81b60',
    padding: "0 7px"
  },
  infoDisplay: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#303645",
    width: "250px",
    height: "3.3rem",
    textAlign: "center",
    borderRadius: ".7rem",
    fontSize: "1.6rem",
    margin: ".8rem auto"
  },
  textLight: {
    color: "#C5C5C5",
    marginLeft: ".4rem",
    fontWeight: "300",
    fontSize: "2rem"
  },
  marginCenter: {
    margin: "auto auto auto auto",
    justifySelf: "center"
  },
  cardLabels: {
    margin: 0,
    textTransform: "capitalize",
    color: "#D81B60",
    fontSize: "1.6rem",
    fontWeight: "700"
  },
  smallText: {
    fontSize: ".9rem",
    margin: 0
  }
}));

const WagerCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleLinkClick = (event) => {
    const { name } = event.target;
    if(name === "wagerer") {
      event.preventDefault();
      handleOpen();
      navigator.clipboard.writeText(props.wagererAddress);
    } else {
      event.preventDefault();
      handleOpen();
      navigator.clipboard.writeText(props.contractAddress);
    }
  }

  const onMatchWagerPressed = () => {
    // TODO:Ask user if they're SURE they wish to enter wager with another user!!!
    props.challengeWager(props.contractAddress, props.amount);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card elevation={10} className={classes.root}>
        <Typography variant={"body2"} className={classes.infoDisplay}>
          <p className={classes.marginCenter}>ETH {props.amount}</p>
        </Typography>
        <Typography component={"span"} variant={"body2"} gutterBottom >
          <p className={classes.cardLabels}>Wagerer Address: <br /> {" "} </p>
            <span className={classes.textLight}>
            <Link 
              href="#"
              name="wagerer" 
              color="inherit" 
              onClick={handleLinkClick}> 
                {props.wagererAddress.slice(0, 7) + "..." + props.wagererAddress.slice(39)}
              </Link>
            </span>
        </Typography>
        <Typography component={"span"} variant={"body2"} gutterBottom>
          <p className={classes.cardLabels}>Contract Address: <br /> {" "}</p>
            <span className={classes.textLight}>
              <Link 
              href="#"
              name="contract" 
              color="inherit" 
              onClick={handleLinkClick}>
                {props.contractAddress.slice(0, 7) + "..." + props.contractAddress.slice(39)}
              </Link>
            </span>
        </Typography>
        <AddressModal onClose={handleClose} open={open} />
        <CardActions>
          <Button fullWidth="true" onClick={onMatchWagerPressed}>
            Match <br /> Wager
          </Button>
          <Button fullWidth="true" onClick={onMatchWagerPressed}>
            Withdraw Wager
          </Button>
        </CardActions>
        <Typography gutterBottom variant={"body2"} className={classes.textLight}>
          <p className={classes.smallText}>expires: {props.dateExpires}</p>{" "}
        </Typography>
      </Card>
    </ThemeProvider>
  );
};

export default WagerCard;