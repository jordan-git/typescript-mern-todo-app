import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import authClient from '../auth';

interface Props extends RouteProps {
    component: any;
}

const PrivateRoute: React.FunctionComponent<Props> = ({
    component,
    ...rest
}) => {
    const renderFn = (Component: React.ComponentClass) => (
        props: RouteProps
    ) => {
        if (authClient.getCurrentUser()) {
            return <Component {...props} />;
        }

        const redirectProps = {
            to: {
                pathname: '/log-in',
                state: { from: props.location },
            },
        };

        return <Redirect {...redirectProps} />;
    };

    return <Route {...rest} render={renderFn(component)} />;
};

export default PrivateRoute;
