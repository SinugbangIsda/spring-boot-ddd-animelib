import React, { 
  useContext, 
  useState 
} from 'react';
import { AppLayoutProps } from '../../interfaces';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/global';
import { 
  IoBookmark, 
  MdMovieFilter 
} from "react-icons/all";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
} from '@mantine/core';

const NavItems = [
  {
    name: "Anime List",
    path: "/",
    icon: 
      <MdMovieFilter
        aria-hidden = "true"
        className = "flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-white"
      />
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: 
      <IoBookmark 
        aria-hidden = "true" 
        className = "flex-shrink-0 w-6 h-6  transition duration-75  group-hover:text-white" 
      /> 
  }
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const [ userDropDown, setUserDropDown ] = useState(false);
  const [ navbarOpen, setNavBarOpen ] = useState<boolean>(true);
  const { data, dispatch } = useContext(GlobalContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    })
  }

  return (
    <AppShell
      styles = {{
        body: {
          backgroundColor: '#1a1b1e',
        }
      }}
      navbarOffsetBreakpoint = "sm"
      asideOffsetBreakpoint = "sm"
      header = {
        <Header 
          className = "bg-[#1A1B1E] border-0 select-none shadow-2xl"
          height = {{ 
            base: 50, 
            md: 70 
          }} 
          p = "md"
        >
          <div
            className = "flex flex-row justify-between items-center h-full"
          >
            <div className = "flex flex-row items-center space-x-2">
              <MediaQuery 
                largerThan = "sm" 
                styles = {{ display: 'none' }}
              >
                <Burger
                  opened = { navbarOpen }
                  onClick = {() => setNavBarOpen((o) => !o)}
                  size = "sm"
                  color = "white"
                  mr = "xl"
                />
              </MediaQuery>
              <p className = "text-white font-bold text-2xl text-center">
                Anime<span className = "text-[#E6613E]">Lib</span>
              </p>
            </div>
            <div className = "relative">
              <button
                type = "button"
                className = "flex items-center justify-center w-8 h-8 text-gray-500 transition duration-150 ease-in-out rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick = {() => setUserDropDown(!userDropDown)}
              >
                <img 
                  src = "https://i.kym-cdn.com/entries/icons/original/000/021/155/Fish_wearing_a_chicken_smoking_a_cigarette_cover.jpg"
                  alt = "User Avatar"
                  className = "rounded-full"
                />
              </button>
              <div className = {`absolute right-0 w-48 py-1 mt-2 origin-top-right bg-[#25262B] rounded-md shadow-lg outline-none ${userDropDown ? "block" : "hidden"}`}>
                <button
                  className = "w-full text-start px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md text-gray-400 hover:bg-[#35373f]"
                  onClick = { handleLogout }
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </Header>
      }
      navbar = {
        <Navbar 
          p = "md" 
          hiddenBreakpoint = "sm" 
          hidden = { !navbarOpen } 
          width = {{ 
            sm: 200, 
            lg: 300 
          }}
          className = "bg-[#141517] border-[#1A1B1E]"
        >
          { NavItems.map((item, index: number) => (
            <Link
              key = { index }
              to = { `${item.path}` }
              className = "flex flex-row items-center p-2 rounded-lg text-white hover:bg-[#25262b] space-x-4 text-md select-none"
            >
              { item.icon }
              <p>
                { item.name }
              </p>
            </Link>
          ))}
        </Navbar>
      }
    >
      { children }
    </AppShell>
  )
}

export default AppLayout;