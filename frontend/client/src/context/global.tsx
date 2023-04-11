import React, { createContext, useReducer} from "react";
import { GlobalContextProps, GlobalProviderProps } from "../interfaces";
import { AppReducer } from "./reducer";


const INITIAL_STATE: GlobalContextProps = {
    data: { 
        user_id: null, 
        refreshToken: null, 
        emailAddress: null,
        username: null,
        profileImageUri: null,
    },
    error: null,
    dispatch() {
        return() => {}
    }
};

export const GlobalContext = createContext(INITIAL_STATE);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [ state, dispatch ] = useReducer(AppReducer, INITIAL_STATE)
    
    return (
        <GlobalContext.Provider 
            value = {{
                data: { 
                    user_id: state.data.user_id,
                    refreshToken: state.data.refreshToken,
                    emailAddress: state.data.emailAddress,
                    username: state.data.username,
                    profileImageUri: state.data.profileImageUri
                },
                error: state.error,
                dispatch
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
}