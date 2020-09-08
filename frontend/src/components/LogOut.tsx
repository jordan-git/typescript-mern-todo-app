import React from 'react';
import { Redirect } from 'react-router-dom';

interface Props {
    onLogOut: () => void;
}

class LogOut extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.onLogOut();
    }

    render() {
        return <Redirect to="/" />;
    }
}

export default LogOut;
