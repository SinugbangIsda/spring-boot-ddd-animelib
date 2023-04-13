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