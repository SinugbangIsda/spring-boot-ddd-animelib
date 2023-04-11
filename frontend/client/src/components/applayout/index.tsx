import { 
    AppShell, 
    Navbar,
    Header,
    MediaQuery,
    Burger 
} from '@mantine/core';
import React, { useState } from 'react';
import { AppLayoutProps } from '../../interfaces';
import { Link } from 'react-router-dom';

const AppLayout = ({ children }: AppLayoutProps) => {
    const [ opened, setOpened ] = useState<boolean>(false);
  return (
    <AppShell
      navbarOffsetBreakpoint = "sm"
      asideOffsetBreakpoint = "sm"
      navbar = {
        <Navbar 
          p = "md" 
          hiddenBreakpoint = "sm" 
          hidden = { !opened } 
          width = {{ sm: 200, lg: 300 }}
        >
          <p>
            Navbar
          </p>
        </Navbar>
      }
      header = {
        <Header height = {{ base: 50, md: 70 }} p = "md">
          <div className = "flex flex-row items-center h-full">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened = { opened }
                onClick = {() => setOpened((o) => !o)}
                size = "sm"
                color = {"black"}
                mr = "xl"
              />
            </MediaQuery>
            <div className = "flex flex-row justify-center items-center space-x-1 select-none">
              <p className = "font-bold text-2xl hover:cursor-pointer">
                Anime<span className = "text-[#E6613E]">Lib</span>
              </p>
              <div className = "px-4 py-1 rounded-full bg-gray-700">
                <p className = "text-white text-xs font-semibold">
                  v6.9
                </p>
              </div>
            </div>
          </div>
        </Header>
      }
    >
      { children }
    </AppShell>
  )
}

export default AppLayout;