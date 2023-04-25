import { Link, Outlet } from "react-router-dom";
import { NavItemProps } from "../../../interfaces";
import { Flex, Icon } from "@chakra-ui/react";

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
        { icon && (
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

export default NavItem;