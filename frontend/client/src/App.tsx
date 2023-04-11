import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import { GlobalProvider } from "./context/global";
import lazyLoad from './utils/lazyLoad';
import { wait } from './utils/wait';

const Dashboard = lazyLoad(() => wait(1000).then(() => import('./pages/dashboard')));
const Signin = lazyLoad(() => wait(5000).then(() => import('./pages/signin')));
const Signup = lazyLoad(() => wait(5000).then(() => import('./pages/signup')));
const Watchlist = lazyLoad(() => wait(5000).then(() => import('./pages/watchlist')));
const Error404 = lazyLoad(() => wait(5000).then(() => import('./pages/error404')));
const NewForm = lazyLoad(() => wait(1000).then(() => import('./pages/newform')));
const ForgotPassword = lazyLoad(() => wait(1000).then(() => import('./pages/forgotpassword')));
// const Dashboard = lazyLoad(() => import('./pages/dashboard'));
// const Signin = lazyLoad(() => import('./pages/signin'));
// const Signup = lazyLoad(() => import('./pages/signup'));
// const Watchlist = lazyLoad(() => import('./pages/watchlist'));
// const Error404 = lazyLoad(() => import('./pages/error404'));
// const NewForm = lazyLoad(() => import('./pages/newform'));
// const ForgotPassword = lazyLoad(() => import('./pages/forgotpassword'));

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path = "/"
            element = {
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route 
            path = "/signin" 
            element = { 
              <Signin/> 
            } 
          />
          <Route 
            path = "/signup" 
            element = {
              <Signup/>
            }
          />
          <Route
            path = "/forgotpassword"
            element = {
              <ForgotPassword />
            }
          />
          <Route
            path = "/watchlist"
            element = {
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            }
          />
          <Route
            path = "/newform"
            element = {
              <PrivateRoute>
                <NewForm />
              </PrivateRoute>
            }
          />
          <Route 
            path = '*' 
            element = { 
              <Error404/> 
            } 
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;