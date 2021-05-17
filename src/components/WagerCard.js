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
      minWidth: 420,
      borderRadius: "1.3rem",
      margin: "1rem auto",
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
      height: "3.3rem",
      textAlign: "center",
      borderRadius: ".7rem",
      fontSize: "1.6rem",
      margin: "1.4rem auto"
    },
    capitolText: {
      textTransform: "lowercase"
    },
    textLight: {
      color: "#C5C5C5",
      marginLeft: '.4rem',
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
      fontSize: '1.5rem',
      fontWeight: '700'
    },
    smallText: {
      fontSize: ".9rem",
      margin: "0"
    },
    cap: {
      textTransform: "capitolize"
    }
  }));
  
  const WagerCard = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    //override default mui button styling 
    const StyledButton = withStyles({
      root: {
        color: "#fff",
        width: "23rem",
        height: "4rem",
        borderRadius: ".9rem",
        marginTop: ".8rem",
        textTransform: "capitalize",
        fontSize: "1.5rem"
      }
    })(Button);
  
    return (
      <ThemeProvider theme={theme}>
        <Card elevation={10} className={classes.root}>
          <Typography variant="" className={classes.infoDisplay} color="light">
           <p className={classes.marginCenter}>
            {props.amount}
           </p>
          </Typography>
          <Typography gutterBottom>
            <p className={classes.cardLabels}>
              Wagerer Address:{" "}<span className={classes.textLight}>{props.wagererAddress}</span>     
            </p>
          </Typography>
          <Typography gutterBottom>
            <p className={classes.cardLabels}>
              Contract Address:{" "}<span className={classes.textLight}>{props.address}</span>
            </p>
          </Typography>
          <CardActions>
            <StyledButton className={classes.wgrBtn} size="large" variant="outlined">
              <span className={classes.cap}>Match Wager</span>
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
  