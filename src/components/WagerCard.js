import {
    makeStyles,
    Card,
    CardActions,
    Button,
    Typography
  } from "@material-ui/core";
  import { ThemeProvider, useTheme } from "@material-ui/core/styles";
  

  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 275,
      borderRadius: "20px",
      maxWidth: 360,
      margin: "20px auto",
      textAlign: "left",
      backgroundColor: "#1e273c",
      border: `1px solid #d81b60`,
      ...theme.typography.button,
      padding: theme.spacing(1)
    },
    infoDisplay: {
      display: "flex",
      color: "#fff",
      alignItems: "center",
      justifySelf: "center",
      backgroundColor: "#36454f",
      width: "100%",
      minWidth: "10rem",
      height: "3rem",
      textAlign: "center",
      borderRadius: "10px",
      //fontWeight: "bold",
      fontSize: "1.5rem",
      margin: "20px auto"
    },
    capitolText: {
      textTransform: "lowercase"
    },
    textLight: {
      color: "#C5C5C5"
    },
    marginCenter: {
      margin: "auto auto auto auto",
      justifySelf: "center"
    },
    lower: {
      margin: 0,
      textTransform: "capitalize",
      color: "tomato"
    },
    smallText: {
      fontSize: ".8rem",
      margin: "0"
    },
    wgrBtn: {
      color: "#fff",
      width: "100%",
      minWidth: "100%"
    }
  }));
  
  const WagerCard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
  
    return (
      <ThemeProvider theme={theme}>
        <Card elevation={10} className={classes.root}>
          <Typography variant="" className={classes.infoDisplay} color="light">
            <p className={classes.marginCenter}></p>
          </Typography>
          <Typography gutterBottom>
            <p className={classes.lower}>
              Wager Address:{" "}<span className={classes.textLight}>{props.wagererAddress}</span>
              
            </p>

          </Typography>
          <Typography gutterBottom>
            <p className={classes.lower}>
              Wagerer Address:{" "}<span className={classes.textLight}>{props.address}</span>
              
            
            
            </p>
          </Typography>
          <CardActions>
            <Button className={classes.wgrBtn} size="large" variant="outlined">
              Match Wager
            </Button>
          </CardActions>
          <Typography className={classes.textLight} gutterBottom>
            <p className={classes.smallText}>{props.dateExpires}</p>{" "}
            
          </Typography>
        </Card>
      </ThemeProvider>
    );
  };
  
  export default WagerCard;
  