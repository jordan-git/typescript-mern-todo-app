import React from 'react';

type Todo = {
    owner: object;
    description: string;
    completed: boolean;
};

interface State {
    todos: Array<Todo>;
}

class TodoList extends React.Component<any, State> {
    state: State = {
        todos: [],
    };

    render() {
        return (
            <div>
                <h1>TodoList</h1>
            </div>
        );
    }
}

export default TodoList;
