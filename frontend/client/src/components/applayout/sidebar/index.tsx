import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import { SidebarProps } from "../../../interfaces";
import LinkItems from "../nav/linkitems";
import NavItem from "../nav/navitem";

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
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

export default Sidebar;
