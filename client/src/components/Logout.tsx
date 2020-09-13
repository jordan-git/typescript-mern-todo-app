import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
    resetUserInfo: () => void;
}

const Logout: React.FunctionComponent<Props> = (props: Props) => {
    useEffect(() => {
        localStorage.removeItem('token');
        props.resetUserInfo();
    });

    return <Redirect to="/" />;
};

export default Logout;
