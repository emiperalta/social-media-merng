import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
    const context = useContext(AuthContext);

    //if there is a user logged in, when search '/login' or '/register', the page will redirect to '/' (home)
    return (
        <Route
            {...rest}
            render={props =>
                context.user ? <Redirect to='/' /> : <Component {...props} />
            }
        />
    );
};

export default AuthRoute;
