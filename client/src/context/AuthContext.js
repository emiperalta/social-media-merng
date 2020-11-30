import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
};

if (localStorage.getItem('jwtToken')) {
    // if there is a user logged in
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(token);

    // check if the token expiration time is over
    if (decodedToken.exp * 1000 < Date.now())
        localStorage.removeItem('jwtToken');
    else initialState.user = decodedToken;
}

const AuthContext = createContext({
    //initial values of context
    user: null,
    login: userData => {},
    logout: () => {},
});

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

const AuthProvider = props => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = userData => {
        // for persistent user login
        localStorage.setItem('jwtToken', userData.token);

        dispatch({
            type: 'LOGIN',
            payload: userData,
        });
    };

    const logout = () => {
        // for remove the user logged in
        localStorage.removeItem('jwtToken');

        dispatch({
            type: 'LOGOUT',
        });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
};

export { AuthContext, AuthProvider };
