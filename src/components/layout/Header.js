import { useState, useEffect } from "react";
import { ReactComponent as LilLogo } from '../../designs/lilLogo.svg';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    SvgIcon,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        padding: "16px",
        marginRight: 16,
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
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

    function Icon() {
        return (
          <SvgIcon >
            <LilLogo width="24px" height="24px"/>
          </SvgIcon>
        );
      }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Icon />
                    <Typography variant="h6" className={classes.title}>
                        2X
                    </Typography>
                    {isDesktop ? (
                        <>
                            <Button
                                className={classes.menuButton}
                                color="inherit">
                                About
                            </Button>
                            <Button
                                className={classes.menuButton}
                                color="inherit">
                                Developers
                            </Button>
                            <Button
                                className={classes.menuButton}
                                color="inherit">
                                FAQ
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                className={classes.menuButton} 
                                aria-controls="simple-menu" 
                                aria-haspopup="true" 
                                onClick={handleBurgerClick}>
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
