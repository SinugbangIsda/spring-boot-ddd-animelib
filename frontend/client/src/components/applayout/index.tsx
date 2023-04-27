import React from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { AppLayoutProps } from '../../interfaces';
import MobileNav from './nav/mobilenav';
import Sidebar from './sidebar';

const AppLayout = ({ children }: AppLayoutProps ) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box 
      minH = "100vh" 
      bg = "#1a1b1e"
      overflowY = "auto"
    >
      <Sidebar
        onClose = {() => onClose }
        display = {{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus = { false }
        isOpen = { isOpen }
        placement = "left"
        onClose = { onClose }
        returnFocusOnClose = { false }
        onOverlayClick = { onClose }
        size = "full"
      >
        <DrawerContent>
          <Sidebar onClose = { onClose } />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen = { onOpen } />
      <Box 
        ml = {{ base: 0, md: 60 }} 
        position = "relative"
      >
        { children }
      </Box>
    </Box>
  );
};

export default AppLayout;
