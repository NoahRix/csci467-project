import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

export default function EmployeesProtectedRoute({ component: Component, ...rest }) {

    //The isEmployeeAuthed boolean allows the user to navigate the dashboard.
    const { isEmployeeAuthed } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (isEmployeeAuthed) {
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