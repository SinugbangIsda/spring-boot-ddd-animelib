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
                    src = { userData.imageURI ? userData.imageURI : ""}
                    name = { userData.firstName + ' ' + userData.lastName }
                    bg = { userData.imageURI ? 'transparent' : '#E6613E'}
                    color = { userData.imageURI ? 'transparent' : 'white' }
                  />
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