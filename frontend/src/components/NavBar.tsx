import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    currentUser: string | null;
}

const NavBar: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {props.currentUser ? (
                    <>
                        <li>
                            <Link to="/todos">Todos</Link>
                        </li>
                        <li>
                            <Link to="/log-out">Log Out</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/log-in">Log In</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
