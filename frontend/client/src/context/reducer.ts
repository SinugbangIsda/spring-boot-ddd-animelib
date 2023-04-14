import { GlobalContextProps } from "../interfaces";
import { Actions } from "../types";

export const AppReducer = (state: GlobalContextProps, action: Actions) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { 
                ...state, 
                data: { 
                    userId: action.payload,
                    refreshToken: action.payload,
                    emailAddress: action.payload,
                    fullname: action.payload,
                    profileImageUri: action.payload
                } 
            };

        case "LOGIN_FAILED":
            return { 
                ...state,
                error: action.payload
            };

        case "LOGOUT":
            return { 
                ...state, 
                data: { 
                    userId: null,
                    refreshToken: null,
                    emailAddress: null,
                    fullname: null,
                    profileImageUri: null
                }
            };

        default:
            return state;
    }
}