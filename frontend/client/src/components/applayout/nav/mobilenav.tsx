import { 
    useToast, 
    Flex, 
    IconButton, 
    HStack, 
    Menu, 
    MenuButton, 
    VStack, 
    MenuList, 
    MenuItem, 
    MenuDivider, 
    Text, 
    Box, 
    Avatar 
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { MobileProps, User } from "../../../interfaces";
import { getUserAndToken, logout } from "../../../redux/slices/authSlice";

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

export default MobileNav;