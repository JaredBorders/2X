import { useState, useEffect } from "react";
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
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
        position: "fixed",
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

    const [anchorEl, setAnchorEl] = useState(null);

    const handleBurgerClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
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
                        <>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleBurgerClick}>
                                <MenuIcon />
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>About</MenuItem>
                                <MenuItem onClick={handleClose}>Developers</MenuItem>
                                <MenuItem onClick={handleClose}>FAQ</MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
