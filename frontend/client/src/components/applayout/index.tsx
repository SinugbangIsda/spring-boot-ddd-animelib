import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast
} from '@chakra-ui/react';
import {
  FiHome,
  FiMenu,
  FiChevronDown,
  FiBookmark
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserAndToken, logout } from '../../redux/slices/authSlice';
import { User } from '../../interfaces';

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
const LinkItems: Array<LinkItemProps> = [
  { 
    name: 'Dashboard', 
    icon: FiHome,
    to: '/'
  },
  { 
    name: 'Watchlist', 
    icon: FiBookmark,
    to: '/watchlist'
  },

];

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box 
      minH = "100vh" 
      bg = "#1a1b1e"
    >
      <SidebarContent
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
          <SidebarContent onClose = { onClose } />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen = { onOpen } />
      <Box ml = {{ base: 0, md: 60 }} >
        { children }
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition = "3s ease"
      bg = "#141517"
      borderRight = "1px"
      borderRightColor = "#1A1B1E"
      w = {{ base: 'full', md: 60 }}
      pos = "fixed"
      h = "full"
      {...rest}>
      <Flex 
        h = "20" 
        alignItems = "center" 
        mx = "8" 
        justifyContent = "space-between"
      >
        <Flex
          fontSize = "2xl"
          as = "b"
          css = {{
            "WebkitUserSelect": "none",
            "msUserSelect": "none",
            "userSelectg": "none",
          }}
        >
          <Text color = "white">
            Anime
          </Text>
          <Text color = "#E6613E">
            Lib
          </Text>
        </Flex>
      <CloseButton 
        display = {{ base: 'flex', md: 'none' }} 
        onClick = { onClose }
        color = "white" 
      />
      </Flex>
      { LinkItems.map((link) => (
        <NavItem 
          key = { link.name } 
          icon = { link.icon }
          to = { link.to }
        >
          { link.name }
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  to: string;
} 
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  return (
    <Link to = { to }>
      <Flex
        align = "center"
        p = "4"
        mx = "4"
        borderRadius = "lg"
        role = "group"
        cursor = "pointer"
        _hover = {{
          bg: "#25262b"
        }}
        color = "white"
        {...rest}
      >
        {icon && (
          <Icon
            mr = "4"
            fontSize = "16"
            _groupHover = {{
              color: 'white',
            }}
            as = { icon }
          />
        )}
        { children }
        <Outlet />
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = getUserAndToken();
  const userData: User = JSON.parse((user) as string);

  const showToast = (title: string, status: "error"| "info" | "success"| "loading") => {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <Flex
      ml = {{ base: 0, md: 60 }}
      px = {{ base: 4, md: 4 }}
      height = "16"
      alignItems = "center"
      bg = "#1A1B1E"
      borderBottomWidth = "1px"
      borderBottomColor = "#383a40"
      justifyContent = {{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display = {{ base: 'flex', md: 'none' }}
        onClick = { onOpen }
        variant = "outline"
        aria-label = "open menu"
        color = "white"
        _hover = {{
          bg: "transparent",
        }}
        icon = { <FiMenu /> }
      />
      <Flex
        display = {{ base: 'flex', md: 'none'}}
        as = "b"
        fontSize = "2xl"
        css = {{
          "WebkitUserSelect": "none",
          "msUserSelect": "none",
          "userSelectg": "none",
        }}
      >
        <Text color = "white">
          Anime
        </Text>
        <Text color = "#E6613E">
          Lib
        </Text>
      </Flex>
      <HStack spacing = {{ base: '0', md: '6' }}>
        <Flex alignItems = {'center'}>
          <Menu>
            <MenuButton
              py = { 2 }
              transition = "all 0.3s"
              _focus = {{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size = {'sm'}
                  src = {
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display = {{ base: 'none', md: 'flex' }}
                  alignItems = "flex-start"
                  spacing = "1px"
                  ml = "2"
                  color = "white"
                >
                  <Text fontSize = "sm">
                    { userData.firstName + ' ' + userData.lastName }
                  </Text>
                  <Text 
                    fontSize = "xs"
                    textTransform = "capitalize"
                  >
                    { userData.role }
                  </Text>
                </VStack>
                <Box display = {{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg = "#1A1B1E"
              border = "1px"
              borderColor = "#383a40"
              color = "white"
            >
              <Link to = "/profile">
                <MenuItem 
                  bg = "transparent"
                  _hover = {{
                    bg: "#25262b"
                  }}
                >
                  Profile
                </MenuItem>
              </Link>
              <Link to = "/settings">
                <MenuItem
                  bg = "transparent"
                  _hover = {{
                    bg: "#25262b"
                  }}
                >
                  Settings
                </MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem
                bg = "transparent"
                _hover = {{
                  bg: "#25262b"
                }}
                onClick = { () => {
                  try {
                    dispatch(logout());
                    navigate('/signin');
                    showToast("Logout successfully", "success");
                  } catch (error) {
                    showToast("Logout failed", "error");
                  }
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default AppLayout;
