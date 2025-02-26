import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from '../../../hooks/useAuth';
import { Outlet, Link } from "react-router-dom";
import { Button } from '@mui/material';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';



const drawerWidth = 200;

function Dashboard(props) {
    const { user, receptionist } = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar sx={{ backgroundColor: '#3F599E', color: 'white' }}>
                <h3>
                    {user.displayName}
                </h3>
            </Toolbar>
            <Divider />

            {/* nested route in dashboard  */}

            <Box sx={{ textAlign: 'center', marginTop: '15PX' }}>
                {
                    !receptionist && <Box>
                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={`/dashboard`}>
                            <Button color='inherit'>
                                <HomeIcon sx={{ color: 'crimson' }} />
                                Home
                            </Button>
                        </Link>
                        <br />

                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={`/dashboard/myFile`}>
                            <Button color='inherit'>
                                <DescriptionIcon sx={{ color: 'GoldenRod' }} />
                                My File
                            </Button>
                        </Link>
                        <br />

                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={`/dashboard/allFile`}>
                            <Button color='inherit'>
                                <DriveFileMoveIcon sx={{ color: 'GoldenRod' }} />
                                All File
                            </Button>
                        </Link>
                        <br />
                    </Box>
                }

                {
                    receptionist && <Box>
                        {/*start new  */}
                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={`/dashboard/allFile`}>
                            <Button color='inherit'>
                                <DriveFileMoveIcon sx={{ color: 'GoldenRod' }} />
                                All File
                            </Button>
                        </Link>
                        <br />
                        {/* end new  */}

                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={`/dashboard/addFile`}>
                            <Button color='inherit'>
                                <AddBoxIcon sx={{ color: 'Peru' }} />
                                Add File
                            </Button>
                        </Link>

                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={`/dashboard/make-receptionist`}>
                            <Button color='inherit'>
                                <AddBoxIcon sx={{ color: 'Peru' }} />
                                Make Receptionist
                            </Button>
                        </Link>
                    </Box>
                }
                <br />
            </Box>

        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', backgroundColor: '' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }, backgroundColor: '#4460AA'
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
                        Dashboard
                    </Typography>
                    <Link style={{ textDecoration: 'none', color: 'white', marginLeft: '30PX' }} to="/home">
                        <Typography>Home</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    container={container}
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
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Typography paragraph>
                    <Outlet></Outlet>

                </Typography>

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;