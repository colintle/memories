import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { GoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from "../../actions/auth";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

function Auth() {

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp)
        {
            dispatch(signup(formData, navigate));
        }
        else{
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => ! prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        console.log(res);
        const userObject = jwt_decode(res.credential);
        try{
            dispatch({type: 'AUTH', data: {...userObject, token: res.credential}});
            navigate('/');
        }
        catch(error)
        {
            console.log(error);
        }
    };

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later");
    }

    return ( 
        <Container component='main' maxwidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className ={classes.avatar}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half></Input>
                                    <Input name='lastName' label="Last Name" handleChange={handleChange} half></Input>
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'></Input>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}></Input>
                        {isSignUp && <Input name ='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'></Input>}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        cookiePolicy='single_host_origin'
                        render={(renderProps) => (<Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon></Icon>} variant='contained'>Google Sign-In</Button>)}
                    ></GoogleLogin>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth