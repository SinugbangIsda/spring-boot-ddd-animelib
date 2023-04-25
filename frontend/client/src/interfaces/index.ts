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
}