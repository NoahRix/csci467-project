import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

export default function AdminProtectedRoute({ component: Component, ...rest }) {

    //The isAdminAuthed boolean allows the user to navigate the dashboard.
    const { isAdmin } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (isAdmin) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/Login",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}
        />
    );
}