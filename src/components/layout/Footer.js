import {
    makeStyles,
    Link,
} from "@material-ui/core";

const useStyles = makeStyles({
    footerWrapper: {
        display: "flex",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0
    },
    linkMargin: {
        margin: "20px"
    },
    copyright: {
        marginLeft: "20px"
    }
});
const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footerWrapper}>
            <p className={classes.copyright}>&copy; 2021 2X</p>
            <div>
                <Link color="inherit" className={classes.linkMargin}>Disclaimer</Link>
            </div>
        </div>
    )
}

export default Footer;