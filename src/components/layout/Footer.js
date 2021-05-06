import {
    makeStyles,
    Link,
    Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4)
    },
    footerWrapper: {
        display: "flex",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        bottom: 0,
        marginTop: theme.spacing(1),
    },
    copyright: {
        marginLeft: theme.spacing(6),
    },
    disclaimer: {
        marginRight: theme.spacing(6),
    }
}));
const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Divider light />
            <div className={classes.footerWrapper}>
                <p className={classes.copyright}>
                    &copy; 2021 2X
                </p>
                <div className={classes.disclaimer}>
                    <Link color="inherit">Disclaimer</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;