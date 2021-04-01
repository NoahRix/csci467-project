import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

export default function CustomerProtectedRoute({ component: Component, ...rest }) {

    //The isCustomerAuthed boolean allows the user to navigate the dashboard.
    const { isCustomerAuthed } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (isCustomerAuthed) {
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