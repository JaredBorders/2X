import React, { useState } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import {
  makeStyles,
  Grid,
  Card,
  CardActions,
  Button,
  Link,
  Typography
} from "@material-ui/core";
import { ThemeProvider, withStyles } from "@material-ui/core/styles";
import AddressModal from './Modals/AddressModal';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "1.3rem",
    margin: "0.75rem",
    backgroundColor: "#1e273c",
    border: '1px solid #d81b60',
    padding: "0 7px",
    width: "280px",
  },
  main: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 50,
  },
  infoDisplay: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#303645",
    width: "250px",
    height: "2.3rem",
    textAlign: "center",
    borderRadius: ".7rem",
    fontSize: "1rem",
    margin: ".8rem auto"
  },
  textLight: {
    color: "#C5C5C5",
    marginLeft: ".4rem",
    fontWeight: "300",
    fontSize: "1rem"
  },
  marginCenter: {
    margin: "auto auto auto auto",
    justifySelf: "center"
  },
  cardLabels: {
    margin: 0,
    textTransform: "capitalize",
    color: "#D81B60",
    fontSize: "1rem",
    fontWeight: "700"
  },
  smallText: {
    fontSize: ".8rem",
    margin: 0
  },
  copyIcon: {
    fontSize: '14px'
  },
  actionButtons: {
    spacing: '4'
  },
}));

const WagerCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

    //override default mui button styling 
    const StyledButton = withStyles({
      root: {
        color: "#fff",
        height: "2.3rem",
        borderRadius: ".9rem",
        textTransform: "capitalize",
        fontSize: "1rem",
        width: "260px",
      }
    })(Button);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLinkClick = (event) => {
    const { name } = event.target;
    if (name === "wagerer") {
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
    props.challengeWager(props.contractAddress, props.amount);
  };

  const onWithdrawWagerPressed = () => {
    props.withdrawWager(props.contractAddress);
  };

  return (
    <ThemeProvider>
      <Card elevation={10} className={classes.root}>
        <Typography variant={"body2"} className={classes.infoDisplay}>
          <p className={classes.marginCenter}>ETH {props.amount}</p>
        </Typography>
        <Typography component={"span"} variant={"body2"} >
          <p className={classes.cardLabels}>Wagerer Address: <br /> {" "} </p>
          <span className={classes.textLight}>
            <Link
              underline="none"
              href="#"
              name="wagerer"
              color="inherit"
              onClick={handleLinkClick}>
              {props.wagererAddress.slice(0, 19) + "..." + props.wagererAddress.slice(39)}{" "}<CopyOutlined className={classes.copyIcon} />
            </Link>
          </span>
        </Typography>
        <Typography component={"span"} variant={"body2"} gutterBottom>
          <p className={classes.cardLabels}>Contract Address: <br /> {" "}</p>
          <span className={classes.textLight}>
            <Link
              href="#"
              underline="none"
              name="contract"
              color="inherit"
              onClick={handleLinkClick}>
              {props.contractAddress.slice(0, 19) + "..." + props.contractAddress.slice(39)}{" "}<CopyOutlined className={classes.copyIcon} />
            </Link>
          </span>
        </Typography>
        <AddressModal onClose={handleClose} open={open} />
        <CardActions>  
          {
            (window.ethereum || window.web3) ? (
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <StyledButton variant="outlined" onClick={onMatchWagerPressed}>
                    <span>Match Wager</span>
                  </StyledButton>
                </Grid>
                <Grid item>
                  <StyledButton variant="outlined" onClick={onWithdrawWagerPressed}>
                    <span>Withdraw Wager</span>
                  </StyledButton>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <StyledButton variant="outlined" disabled>
                    <span>Match Wager</span>
                  </StyledButton>
                </Grid>
                <Grid item>
                  <StyledButton variant="outlined" disabled>
                    <span>Withdraw Wager</span>
                  </StyledButton>
                </Grid>
              </Grid>
            )
          }
        </CardActions>
        <Typography gutterBottom variant={"body2"} className={classes.textLight}>
          <p className={classes.smallText}>expires: {props.dateExpires}</p>{" "}
        </Typography>
      </Card>
    </ThemeProvider>
  );
};

export default WagerCard;