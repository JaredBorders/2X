import {
    makeStyles,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 8,
        textAlign: "left",
        backgroundColor: "#1e273c",
        border: `1px solid #d81b60`,
    },
});

const WagerCard = (props) => {
    const classes = useStyles();

    return (
        <Card elevation={10} className={classes.root}>
            <CardContent>
                <Typography color="subtitle" gutterBottom>
                    Amount: ETH {props.amount}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Wager Address: {props.wagererAddress}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Wagerer: {props.address}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Created: {props.dateCreated}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                    Expires: {props.dateExpires}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" variant="outlined">Match Wager</Button>
            </CardActions>
        </Card>
    );
}

export default WagerCard;