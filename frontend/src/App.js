import React from 'react';
import NavBar from './components/NavBar/NavBar.js';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home/Home.js';
import { Container } from '@material-ui/core';
import Auth from './components/Auth/Auth.js';
import {GoogleOAuthProvider} from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails.js';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(process.env.REACT_APP_CLIENTID);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID}>
      <BrowserRouter>
        <Container maxidth='xl'>
          <NavBar></NavBar>
          <Routes>
            <Route path='/' exact element={<Navigate replace to='/posts'/>}></Route>
            <Route path='/posts' exact element={<Home></Home>}></Route>
            <Route path='/posts/search' exact element={<Home></Home>}></Route>
            <Route path='/posts/:id' exact element={<PostDetails></PostDetails>}></Route>
            <Route path='/auth' exact element={(!user) ? <Auth></Auth> : <Navigate replace to='/posts'></Navigate>}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
