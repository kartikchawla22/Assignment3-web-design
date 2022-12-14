import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideBar from '../SideBar'
import { AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import styles from './index.module.scss';
import { signOut } from "firebase/auth";
import * as fireBaseConfig from "../../firebase"
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const AppBarHeader = () => {
    // Handling the mobile view, menu should be shown only after clicking the burger icon in mobile devices.
    const [mobileOpen, setMobileOpen] = React.useState(false);
    // Handling the user widget.
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // Drawer for mobile.
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    // Open user widget.
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    // Close user widget.
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Handling the logout using firebase.
    const logout = () => {
        signOut(fireBaseConfig.auth).then(() => {
            handleClose()
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <Box sx={{ display: 'flex' }} className={styles.appBarContainer}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Kartik && Himanshu
                    </Typography>
                    {true && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle className={styles.userAccount} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link className={styles.link} to={"/profile"} >Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <SideBar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <SideBar />
                </Drawer>
            </Box>
        </Box>
    )
}
export default AppBarHeader