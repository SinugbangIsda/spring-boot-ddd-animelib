import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import { GlobalProvider } from "./context/global";
import lazyLoad from './utils/lazyLoad';

const Dashboard = lazyLoad(() => import('./pages/dashboard'));
const Signin = lazyLoad(() => import('./pages/signin'));
const Signup = lazyLoad(() => import('./pages/signup'));
const Watchlist = lazyLoad(() => import('./pages/watchlist'));
const Error404 = lazyLoad(() => import('./pages/error404'));
const NewForm = lazyLoad(() => import('./pages/newform'));
const ForgotPassword = lazyLoad(() => import('./pages/forgotpassword'));
const SelectedAnime = lazyLoad(() => import('./pages/anime'));

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>,
  },
  {
    path: '/signin',
    element: <Signin/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />,
  },
  {
    path: '/anime/:animeId',
    element:
      <PrivateRoute>
        <SelectedAnime />
      </PrivateRoute>,
  },
  {
    path: '/watchlist',
    element:
      <PrivateRoute>
        <Watchlist />
      </PrivateRoute>,
  },
  {
    path: '/newform',
    element:
      <PrivateRoute>
        <NewForm />
      </PrivateRoute>,
  },
  {
    path: '*',
    element: <Error404/>,
  },
]);

const App = () => {
  return (
    <GlobalProvider>
      <RouterProvider router = { router } />      
    </GlobalProvider>
  )
}

export default App;