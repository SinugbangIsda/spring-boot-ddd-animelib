import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import lazyLoad from './utils/lazyLoad';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react';

const Dashboard = lazyLoad(() => import('./pages/dashboard'));
const Signin = lazyLoad(() => import('./pages/signin'));
const Signup = lazyLoad(() => import('./pages/signup'));
const Watchlist = lazyLoad(() => import('./pages/watchlist'));
const Error404 = lazyLoad(() => import('./pages/error404'));
const ForgotPassword = lazyLoad(() => import('./pages/forgotpassword'));
const SelectedAnime = lazyLoad(() => import('./pages/anime'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "watchlist",
        element: <Watchlist />
      },
      {
        path: "anime/:animeId",
        element: <SelectedAnime />
      }
    ]
  },
  {
    path: "/*",
    element: <Error404 />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  }
]);

const App = () => {
  return (
    <Provider store = { store }>
      <ChakraProvider>
        <RouterProvider router = { router } />
      </ChakraProvider>
    </Provider>
  )
}

export default App;