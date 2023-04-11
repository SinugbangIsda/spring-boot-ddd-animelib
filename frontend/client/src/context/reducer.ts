import { GlobalContextProps } from "../interfaces";
import { Actions } from "../types";

export const AppReducer = (state: GlobalContextProps, action: Actions) => {
    switch (action.type) {
        case "LOGIN_START":
            return { 
                ...state 
            };

        case "LOGIN_SUCCESS":
            return { 
                ...state, 
                data: { 
                    user_id: action.payload,
                    refreshToken: action.payload,
                    emailAddress: action.payload,
                    username: action.payload,
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
                    user_id: null,
                    refreshToken: null,
                    emailAddress: null,
                    username: null,
                    profileImageUri: null
                }
            };

        default:
            return state;
    }
}