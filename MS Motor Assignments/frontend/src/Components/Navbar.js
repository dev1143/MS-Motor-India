import * as React from 'react';
import "./styles.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CssBaseline from '@mui/material/CssBaseline';
import Slide from '@mui/material/Slide';
import { Helmet } from "react-helmet";
// import { Link } from 'react-router-dom';

const pages = ['Home', 'Products', 'Admin'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const organizationJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MS Motor Cars",
    "url": "https://www.msmotorcars.com",
    "logo": "https://www.msmotorcars.com/images/msmotor.png",
    "sameAs": [
        "https://www.facebook.com/msmotorcars",
        "https://www.instagram.com/msmotorcars"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "Customer Service",
        "areaServed": "IN",
        "availableLanguage": "English"
    }
};


function Navbar() {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [validate, setValidate] = React.useState(null)
    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        let item = JSON.parse(localStorage.getItem('store-value'))
        if (item) {
            setValidate(item.data.token)
        }
    }, [])

    React.useEffect(() => {
        let fetchuserData = JSON.parse(localStorage.getItem("store-value"));
        if (fetchuserData) setUserData(fetchuserData)
    }, [])

    console.log(validate)


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        if (page && page == 'Products') {
            navigate('/product-cars')
        } else if (page == 'Home') {
            navigate('/')
        } else {
            navigate('/admin-page')
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(organizationJSONLD)}
                </script>
            </Helmet>
            <AppBar style={{ backgroundColor: '#76838' }} position="static">
                <Container maxWidth="xl">
                    <Toolbar >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => {
                                navigate('/')
                            }}
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img src={'/images/msmotor.png'} alt="cannot render" className='ms-motor-logo' />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >

                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img src={'/images/msmotor.png'} alt="cannot render" className='ms-motor-logo' />
                        </Typography>
                        {validate != null &&
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={() => handleCloseNavMenu(page)}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                        }
                        <Box>
                            {validate ? <Button
                                onClick={() => {
                                    localStorage.clear()
                                    setValidate(null)
                                    setUserData(null)
                                    navigate('/')
                                    window.location.reload();
                                }}
                                variant="contained">Logout</Button>
                                :
                                <Button variant="contained" onClick={() => {
                                    navigate('/login')
                                }} >Login/Sign up</Button>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default Navbar;