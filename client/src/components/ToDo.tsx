import React, { useState } from 'react';
import axios from 'axios';

import '../css/ToDo.scss';

interface Props {
    _id: string;
    owner: string;
    description: string;
    completed: boolean;
}

const ToDo: React.FunctionComponent<Props> = (props: Props) => {
    const [completed, setCompleted] = useState<boolean>(
        props.completed ? true : false
    );

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompleted(event.target.checked);

        const token = localStorage.getItem('token');

        if (token) {
            axios
                .put(
                    `/api/todos/${props._id}`,
                    {
                        completed,
                    },
                    { headers: { Authorization: 'Bearer ' + token } }
                )
                .then((response) => {})
                .catch((error) => {});
        }
    };

    return (
        <section className={'todo todo-' + props._id}>
            <span>{props.description}</span>
            <input
                type="checkbox"
                defaultChecked={props.completed}
                onChange={handleChecked}
            />
        </section>
    );
};

export default ToDo;
