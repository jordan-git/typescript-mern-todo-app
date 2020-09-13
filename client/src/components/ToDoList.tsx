import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ToDo from './ToDo';

import '../css/ToDoList.scss';

interface Todo {
    _id: string;
    owner: string;
    description: string;
    completed: boolean;
}

interface Props {
    owner: string | null;
}

const ToDoList: React.FunctionComponent<Props> = ({ owner }) => {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // TODO: Test backend API and fix todos
    const getTodos = () => {
        const token = localStorage.getItem('token');

        if (token) {
            axios
                .get('api/todos', {
                    headers: { Authorization: 'Bearer ' + token },
                })
                .then((response) => {
                    if (response.data) {
                        setTodos(response.data);
                    }
                });
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const handleCreateToDo = (event: React.MouseEvent) => {
        const token = localStorage.getItem('token');

        if (token && inputRef.current) {
            axios
                .post(
                    `/api/todos`,
                    {
                        owner,
                        description: inputRef.current.value,
                        completed: false,
                    },
                    { headers: { Authorization: 'Bearer ' + token } }
                )
                .then((response) => {
                    if (inputRef.current) inputRef.current.value = '';

                    setTodos([...todos, response.data]);
                })
                .catch((error) => {});
        }
    };

    const handleClearChecked = (event: React.MouseEvent) => {
        for (let index = 0; index < todos.length - 1; index++) {
            const todo = todos[index];
            if (todo.completed === true) {
                const token = localStorage.getItem('token');

                if (token) {
                    axios
                        .delete(`/api/todos/${todo._id}`, {
                            headers: { Authorization: 'Bearer ' + token },
                        })
                        .then((response) => {})
                        .catch((error) => {});
                }
            }
        }
        getTodos();
    };

    return (
        <div>
            <h1>To Do List</h1>
            <section id="todo-list">
                {todos.map((todo) => {
                    return <ToDo key={todo._id} {...todo} />;
                })}
                <div id="input-container">
                    <input type="text" ref={inputRef} />
                    <div id="buttons">
                        <button onClick={handleCreateToDo}>Create To Do</button>
                        <button onClick={handleClearChecked}>
                            Clear Completed To Do's
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ToDoList;
