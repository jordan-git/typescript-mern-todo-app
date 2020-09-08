import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface Props extends RouteProps {
    component: any;
    currentUser: string | null;
    mustBeLoggedOut: boolean;
}

const PublicRoute: React.FunctionComponent<Props> = ({
    component,
    currentUser,
    mustBeLoggedOut,
    ...rest
}) => {
    const renderFn = (Component: React.ComponentClass) => (props: Props) => {
        if (props.currentUser && props.mustBeLoggedOut) {
            return <Redirect to="/" />;
        }

        return <Component {...props} />;
    };

    // TODO: Fix component
    return <Route {...rest} render={() => renderFn(component)} />;
};

export default PublicRoute;
