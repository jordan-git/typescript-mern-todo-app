import React from 'react';
import { Route, Switch } from 'react-router-dom';
import authClient from '../auth';
import LogIn from './LogIn';
import LogOut from './LogOut';
import Register from './Register';
import NavBar from './NavBar';
import TodoList from './TodoList';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

interface State {
    currentUser: string | null;
}

class App extends React.Component<{}, State> {
    state = {
        currentUser: authClient.getCurrentUser(),
    };

    onLoginSuccess() {
        this.setState({ currentUser: authClient.getCurrentUser() });
    }

    onRegisterSuccess() {
        this.setState({ currentUser: authClient.getCurrentUser() });
    }

    onLogout() {
        authClient.logout();
        this.setState({ currentUser: null });
    }

    render() {
        return (
            <div className="app">
                <NavBar currentUser={this.state.currentUser} />
                <Switch>
                    <Route
                        exact
                        path="/log-in"
                        render={(props) => {
                            return (
                                <LogIn
                                    {...props}
                                    onLoginSuccess={this.onLoginSuccess.bind(
                                        this
                                    )}
                                />
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/log-out"
                        render={(props) => {
                            return (
                                <LogOut
                                    {...props}
                                    onLogOut={this.onLogout.bind(this)}
                                />
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/register"
                        render={(props) => {
                            return (
                                <Register
                                    {...props}
                                    onRegisterSuccess={this.onRegisterSuccess.bind(
                                        this
                                    )}
                                />
                            );
                        }}
                    />

                    <PrivateRoute exact path="/todos" component={TodoList} />
                </Switch>
            </div>
        );
    }
}

export default App;
