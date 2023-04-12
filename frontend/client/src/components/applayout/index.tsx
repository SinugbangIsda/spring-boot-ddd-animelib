import React, { 
  useContext, 
  useState 
} from 'react';
import { AppLayoutProps } from '../../interfaces';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/global';
import { IoBookmark, MdMovieFilter } from "react-icons/all";

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
  const [ sidebarOpen, setSidebarOpen ] = useState(true);
  const { data, dispatch } = useContext(GlobalContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    })
  }

  return (
    <section>
      <nav className = "fixed top-0 z-50 w-full bg-gray-800 select-none">
        <div className = "px-3 py-3 lg:px-5 lg:pl-3">
          <div className = "flex items-center justify-between">
            <div className = "flex items-center justify-start space-x-2">
              <button 
                data-drawer-target = "logo-sidebar" 
                data-drawer-toggle = "logo-sidebar" 
                aria-controls = "logo-sidebar" 
                type = "button" 
                className = "inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                onClick = {() => setSidebarOpen(!sidebarOpen)}  
              >
                <span className = "sr-only">
                  Open sidebar
                </span>
                <svg 
                  className = "w-6 h-6" 
                  aria-hidden = "true" 
                  fill = "currentColor" 
                  viewBox = "0 0 20 20" 
                  xmlns = "http://www.w3.org/2000/svg"
                >
                  <path 
                    clipRule = "evenodd" 
                    fillRule = "evenodd" 
                    d = "M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <div className = "flex flex-row justify-center items-center space-x-2">
                <Link to = "/">
                  <p className = "text-white font-bold text-2xl hover:cursor-pointer text-center">
                    Anime<span className = "text-[#E6613E]">Lib</span>
                  </p>
                </Link>
              </div>
            </div>
            <div className = "flex items-center">
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
                <div className = {`absolute right-0 w-48 py-1 mt-2 origin-top-right bg-[#2D333B] rounded-md shadow-lg outline-none ${userDropDown ? "block" : "hidden"}`}>
                  <Link
                    to = "/profile"
                    className = "block px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to = "/settings"
                    className = "block px-4 py-2 text-sm text-gray-700 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    Settings
                  </Link>
                  <button
                    className = "w-full text-start px-4 py-2 text-sm transition duration-150 ease-in-out rounded-md text-gray-400 hover:bg-gray-700"
                    onClick = { handleLogout }
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside 
        id = "logo-sidebar" 
        className = {`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? '-translate-x-full': 'translate-x-0' } sm:translate-x-0 bg-[#2D333B] select-none`}
        aria-label = "Sidebar"
      >
        <div className = "h-full px-3 pb-4 overflow-y-hidden">
          <ul className = "space-y-2">
            { NavItems.map((item, index: number) => (
              <li key = { index }>
                <Link 
                  to = {`${item.path}`}
                  className = "flex flex-row items-center p-2 rounded-lg text-white hover:bg-gray-700 space-x-4 text-xl"
                >
                  { item.icon }
                  <p>
                    { item.name }
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      { children }
      <div className = "p-4 sm:ml-60">
         <div className = "p-4 mt-6">
            { children }
         </div>
      </div>
    </section>
  )
}

export default AppLayout;