import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import Watchlist from '../pages/watchlist';
import Signin from '../pages/signin';
import Signup from '../pages/signup';


const AppRoutes = () => {
  return (
    <Routes>
        <Route path = '/' element = { <Home /> }/>
        <Route path = '/dashboard' element = { <Dashboard /> }/>
        <Route path = '/watchlist' element = { <Watchlist /> }/>
        <Route path = '/signin' element = { <Signin /> }/>
        <Route path = '/signup' element = { <Signup /> }/>
    </Routes>
  )
}

export default AppRoutes;
