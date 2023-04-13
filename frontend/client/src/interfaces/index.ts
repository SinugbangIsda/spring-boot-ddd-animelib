export interface AppLayoutProps {
    children: JSX.Element | JSX.Element[];
}

export interface GlobalContextProps {
    data: User;
    error: string | null;
    dispatch: any;
}

export interface GlobalProviderProps {
    children: JSX.Element | JSX.Element[];
}

export interface User {
    userId: string | null;
    refreshToken: string | null;
    emailAddress: string | null;
    username: string | null;
    profileImageUri: string | null;
}

export interface Anime {
    animeId: string;
    title: string;
    altTitle: string;
    animeType: string;
    episodes: number;
    genre: string;
    status: string;
    synopsis: string;
    coverImageUri: string;
}

export interface AnimeList {
    animeId: string;
    title: string;
    coverImageUri: string;
    animeType: string;
}

