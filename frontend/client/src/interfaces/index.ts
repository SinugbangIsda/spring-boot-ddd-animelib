import { BoxProps, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface AppLayoutProps {
    children: JSX.Element | JSX.Element[];
};

export interface User {
    id: number | null;
    emailAddress: string | null;
    firstName: string | null;
    lastName: string | null;
    imageURI: string | null;
    role: string | null;
};

export interface SignupUser {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
};

export interface SigninUser {
    emailAddress: string;
    password: string;
};

export interface UserForgotPassword {
    emailAddress: string;
}

export interface Anime {
    id?: number | null;
    title?: string;
    altTitle?: string;
    type?: string;
    episodes?: number;
    genre?: string;
    status?: string;
    synopsis?: string;
    imageURI?: string;
};

export interface Watchlist {
    animeId?: number | null;
    userId: number | null;
};

export interface SearchAnimeQuery {
    query: string;
};

export interface MobileProps extends FlexProps {
    onOpen: () => void;
};

export interface SidebarProps extends BoxProps {
    onClose: () => void;
};

export interface NavItemProps extends FlexProps {
    icon: IconType;
    children: JSX.Element | JSX.Element[] | string;
    to: string;
};

export interface LinkItemProps {
    name: string;
    icon: IconType;
    to: string;
};