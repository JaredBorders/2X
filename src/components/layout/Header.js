import { useState, useEffect } from "react";
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        background: "#1e273c",
    }
}));

const Header = () => {
    const classes = useStyles();
    const [isDesktop, setDesktop] = useState(window.innerWidth > 600);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 600);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });


    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        2X
                    </Typography>
                    {isDesktop ? (
                        <>
                            <Button
                                style={{ marginRight: 16 }}
                                color="inherit">
                                About
                            </Button>
                            <Button
                                style={{ marginRight: 16 }}
                                color="inherit">
                                Developers
                            </Button>
                            <Button
                                style={{ marginRight: 16 }}
                                color="inherit">
                                FAQ
                            </Button>
                        </>
                    ) : (
                        <IconButton
                            /* Add buttons above to MenuButton */
                            edge="start"
                            style={{ marginRight: 16 }}
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
