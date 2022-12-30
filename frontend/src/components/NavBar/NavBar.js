import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button} from '@material-ui/core';
import useStyles from './styles.js';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from "../../images/memories-Text.png"
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function NavBar() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        if (token)
        {
            const decodedToken = jwt_decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime())
            {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        setUser(null);
        navigate("/auth");
    }

    return (
        <AppBar className = {classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt='icon' height='45px'></img>
                <img className = {classes.image}src={memoriesLogo} alt='memories' height='40px'></img>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>   
        </AppBar>
    )
}

export default NavBar