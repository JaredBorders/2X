import React, { useState } from 'react';
import {
    makeStyles,
    Card,
    CardActions,
    Button,
    Typography
  } from "@material-ui/core";
  import { ThemeProvider, useTheme, withStyles } from "@material-ui/core/styles";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 300,
      borderRadius: "20px",
      margin: "20px auto",
      textAlign: "left",
      backgroundColor: "#1e273c",
      border: `1px solid #d81b60`,
      padding: theme.spacing(1)
    },
    infoDisplay: {
      display: "flex",
      color: "#fff",
      alignItems: "center",
      justifySelf: "center",
      backgroundColor: "#303645",
      width: "100%",
      minWidth: "10rem",
      height: "3rem",
      textAlign: "center",
      borderRadius: "10px",
      fontSize: "1.5rem",
      margin: "20px auto"
    },
    capitolText: {
      textTransform: "lowercase"
    },
    textLight: {
      color: "#C5C5C5",
      marginLeft: '7px',
      fontWeight: '400'
    },
    marginCenter: {
      margin: "auto auto auto auto",
      justifySelf: "center"
    },
    cardLabels: {
      margin: 0,
      textTransform: "capitalize",
      color: "#D81B60",
      fontSize: '24px',
      fontWeight: '700'
    },
    smallText: {
      fontSize: ".8rem",
      margin: "0"
    }
  }));
  
  const WagerCard = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    //override default mui styling 
    const StyledButton = withStyles({
      root: {
        color: "#fff",
        width: "360px",
        height: "64px",
        borderRadius: "15px",
        marginTop: "10px"
      }
    })(Button);
  
    return (
      <ThemeProvider theme={theme}>
        <Card elevation={10} className={classes.root}>
          <Typography variant="" className={classes.infoDisplay} color="light">
           <p className={classes.marginCenter}>
            {props.wagerAmount}19.08 ETH
           </p>
          </Typography>
          <Typography gutterBottom>
            <p className={classes.cardLabels}>
              Wager Address:{" "}<span className={classes.textLight}>{props.wagererAddress}</span>     
            </p>
          </Typography>
          <Typography gutterBottom>
            <p className={classes.cardLabels}>
              Contract Address:{" "}<span className={classes.textLight}>{props.address}</span>
            </p>
          </Typography>
          <CardActions>
            <StyledButton className={classes.wgrBtn} size="large" variant="outlined">
              Match Wager
            </StyledButton>
          </CardActions>
          <Typography className={classes.textLight} gutterBottom>
            <p className={classes.smallText}>expires: {props.dateExpires}</p>{" "}
          </Typography>
        </Card>
      </ThemeProvider>
    );
  };
  
  export default WagerCard;
  