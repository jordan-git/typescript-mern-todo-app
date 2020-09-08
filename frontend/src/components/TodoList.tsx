import React from 'react';

interface State {
    todos: object;
}

class TodoList extends React.Component<any, State> {
    state: State = {
        todos: {},
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
