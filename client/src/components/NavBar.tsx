import React from 'react';
import { Link } from 'react-router-dom';
import { UserInfo } from './App';

interface Props {
    currentUser: UserInfo;
}

const NavBar: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {props.currentUser.id ? (
                    <>
                        <li>
                            <Link to="/list">Todo List</Link>
                        </li>
                        <li>
                            <Link to="/logout">Log Out</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
