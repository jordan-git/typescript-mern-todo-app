import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import axios from 'axios';

import NavBar from './NavBar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import ToDoList from './ToDoList';

export interface UserInfo {
    id: string | null;
    username: string | null;
}

interface DecodedData {
    id: string;
    username: string;
    iat: string;
    exp: string;
}

const App: React.FunctionComponent<{}> = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        id: null,
        username: null,
    });

    const resetUserInfo = () => {
        setUserInfo({
            id: null,
            username: null,
        });
    };

    const validateToken = () => {
        const token = localStorage.getItem('token');

        if (token === null) return false;

        return axios
            .get('api/validate', {
                headers: { Authorization: 'Bearer ' + token },
            })
            .then((response) => {
                const data: DecodedData = response.data;
                setUserInfo({
                    id: data.id,
                    username: data.username,
                });
                return true;
            })
            .catch((error) => {
                localStorage.removeItem('token');
                return false;
            });
    };

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <Router>
            <NavBar currentUser={userInfo} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route
                    exact
                    path="/list"
                    render={() =>
                        validateToken() ? (
                            <ToDoList owner={userInfo.id} />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                ></Route>
                <Route exact path="/register">
                    <Register validateToken={validateToken} />
                </Route>
                <Route exact path="/login">
                    <Login validateToken={validateToken} />
                </Route>
                <Route exact path="/logout">
                    <Logout resetUserInfo={resetUserInfo} />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default App;
