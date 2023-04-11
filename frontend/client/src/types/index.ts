export type Actions = 
    | { type: "SET_ERROR", payload: string }
    | { type: "SET_DATA", payload:  string }
    | { type: "LOGIN_START" }
    | { type: "LOGIN_SUCCESS", payload: any }
    | { type: "LOGIN_FAILED", payload: string }
    | { type: "LOGOUT" }