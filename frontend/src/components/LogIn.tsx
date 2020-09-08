import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import authClient from '../auth';

interface Props {
    onLoginSuccess: () => void;
}

interface FormInputs {
    username: string;
    password: string;
}

const LogIn: React.FunctionComponent<Props> = (props: Props) => {
    const { register, handleSubmit, errors } = useForm<FormInputs>();
    const history = useHistory();

    const onSubmit = async (data: any) => {
        const loggedInSuccessfully = await authClient.login(data);
        console.log(loggedInSuccessfully);

        if (loggedInSuccessfully) {
            props.onLoginSuccess();
            history.push('/');
        }
    };

    return (
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                ref={register({
                    required: 'This field is required',
                    minLength: {
                        value: 4,
                        message: 'Username must be at least 4 characters long',
                    },
                    maxLength: {
                        value: 32,
                        message:
                            'Username must be no longer than 32 characters',
                    },
                })}
            />
            <ErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => (
                    <p className="form-error">{message}</p>
                )}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                ref={register({
                    required: 'This field is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                    },
                    maxLength: {
                        value: 48,
                        message:
                            'Password must be no longer than 48 characters',
                    },
                })}
            />
            <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                    <p className="form-error">{message}</p>
                )}
            />

            <button type="submit">Log In</button>
        </form>
    );
};

export default LogIn;
