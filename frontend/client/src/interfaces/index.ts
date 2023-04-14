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
    fullname: string | null;
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

export interface TextInputProps {
    label: string;
    type: string;
    withAsterisk?: boolean;
    error: string | null;
    disabled?: boolean;
    icon?: JSX.Element | JSX.Element[] | null;
    iconWidth?: string | number | null;
    inputWrapperOrder?: "input" | "label" | "error" | "description";
    radius?: number | "xs" | "sm" | "md" | "lg" | "xl";
    required?: boolean;
    rightSection?: JSX.Element | JSX.Element[] | null;
    size: "xs" | "sm" | "md" | "lg" | "xl";
    variant: "unstyled" | "default" | "filled"
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}