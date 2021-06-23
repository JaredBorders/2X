import {
  makeStyles,
  Card,
  CardActions,
  Button,
  Link,
  Typography
} from "@material-ui/core";
import { ThemeProvider, useTheme, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "300px",
    borderRadius: "1.3rem",
    margin: ".5rem auto",
    textAlign: "left",
    backgroundColor: "#1e273c",
    border: '1px solid #d81b60',
    padding: "0 7px"
  },
  infoDisplay: {
    display: "flex",
    color: "#fff",
    alignItems: "center",
    justifySelf: "center",
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
    fontWeight: "400",
    fontSize: "2rem"
  },
  marginCenter: {
    margin: "auto auto auto auto",
    justifySelf: "center"
  },
  cardLabels: {
    margin: 0,
    textAlign: "center",
    textTransform: "capitalize",
    color: "#D81B60",
    fontSize: "1.6rem",
    fontWeight: "700"
  },
  smallText: {
    fontSize: ".9rem",
    margin: "0"
  }
}));

const WagerCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  //override default mui button styling
  const StyledButton = withStyles({
    root: {
      color: "#fff",
      height: "4rem",
      borderRadius: ".9rem",
      fontSize: ".8rem"
    }
  })(Button);

  const onMatchWagerPressed = () => {
    // TODO:Ask user if they're SURE they wish to enter wager with another user!!!
    props.challengeWager(props.contractAddress, props.amount);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card elevation={10} className={classes.root}>
        <Typography
          component={"span"}
          variant={"body2"}
          className={classes.infoDisplay}
        >
          <p className={classes.marginCenter}>ETH {props.amount}</p>
        </Typography>
        <Typography component={"span"} variant={"body2"} gutterBottom>
          <p className={classes.cardLabels}>
            Wagerer Address:
            <br />{" "}
            <span className={classes.textLight}>
            <Link 
              href="#" 
              color="inherit" 
              onClick={ () =>  navigator.clipboard.writeText(props.wagererAddress)}> 
                {props.wagererAddress.slice(0, 7) +
                  "..." +
                  props.wagererAddress.slice(39)}
              </Link>
            </span>
          </p>
        </Typography>
        <Typography component={"span"} variant={"body2"} gutterBottom>
          <p className={classes.cardLabels}>
            Contract Address:
            <br />{" "}
            <span className={classes.textLight}>
              <Link 
              href="#" 
              color="inherit" 
              onClick={ () =>  navigator.clipboard.writeText(props.contractAddress)}>
                {props.contractAddress.slice(0, 7) +
                  "..." +
                  props.contractAddress.slice(39)}
              </Link>
            </span>
          </p>
        </Typography>
        <CardActions>
          <StyledButton
            fullWidth="true"
            className={classes.wgrBtn}
            size="small"
            variant="outlined"
            onClick={onMatchWagerPressed}
          >
            <span className={classes.cap}>
              Match
              <br /> Wager
            </span>
          </StyledButton>
          <StyledButton
            fullWidth="true"
            className={classes.wgrBtn}
            size="small"
            variant="outlined"
            onClick={onMatchWagerPressed}
          >
            <span className={classes.cap}>Withdraw Wager</span>
          </StyledButton>
        </CardActions>
        <Typography
          component={"span"}
          variant={"body2"}
          className={classes.textLight}
          gutterBottom
        >
          <p className={classes.smallText}>expires: {props.dateExpires}</p>{" "}
        </Typography>
      </Card>
    </ThemeProvider>
  );
};

export default WagerCard;
