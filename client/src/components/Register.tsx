import React, { useRef, useState } from 'react';
import axios from 'axios';
import ErrorNotifier from './ErrorNotifier';
import { useHistory } from 'react-router-dom';

interface ErrorMessage {
    show: boolean;
    message: string;
}

interface Props {
    validateToken: () => void;
}

const Register: React.FunctionComponent<Props> = (props: Props) => {
    let history = useHistory();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
        show: false,
        message: 'Something went wrong',
    });

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (usernameRef.current === null || passwordRef.current === null) {
            return;
        }

        axios
            .post('/api/register', {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                props.validateToken();
                history.push('/');
            })
            .catch((error) => {
                setErrorMessage({
                    show: true,
                    message: error.response.data.error,
                });
            });
    };

    return (
        <form className="user-form" onSubmit={handleFormSubmit}>
            <h1>Register</h1>
            <div className="form-field">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    ref={usernameRef}
                />
            </div>
            <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    ref={passwordRef}
                />
            </div>
            {errorMessage.show ? (
                <ErrorNotifier text={errorMessage.message} />
            ) : null}
            <input type="submit" value="Register" />
        </form>
    );
};

export default Register;
