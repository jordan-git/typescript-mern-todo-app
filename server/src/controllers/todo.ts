import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import Todo from '../models/Todo';

interface Token {
    id: string;
    username: string;
    iat: number;
    exp: number;
}

class TodoController {
    public handleTodo(req: Request, res: Response) {
        if (req.method == 'POST') this.handleTodoPost(req, res);
        else if (req.method == 'GET') {
            if (req.params.id) this.handleTodoGetSingle(req, res);
            else this.handleTodoGetAll(req, res);
        } else if (req.method == 'PUT') this.handleTodoUpdate(req, res);
        else if (req.method == 'DELETE') this.handleTodoDelete(req, res);
    }

    private async handleTodoPost(req: Request, res: Response) {
        const { description, completed } = req.body;
        const token: string = req.headers.authorization.split(' ')[1];
        let owner: string;

        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            owner = (decoded as Token).id;
        } catch (error) {
            res.status(401).json({ error: 'Invalid JWT token' });
            return;
        }

        const todo = new Todo({ owner, description, completed });
        try {
            await todo.save();
            res.status(201).json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Error creating new todo' });
        }
    }

    private async handleTodoGetAll(req: Request, res: Response) {
        const token: string = req.headers.authorization.split(' ')[1];
        let owner: string;

        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            owner = (decoded as Token).id;
        } catch (error) {
            return res.status(401).json({ error: 'Invalid JWT token' });
        }

        try {
            const todos = await Todo.find({ owner }).exec();
            if (!todos) {
                return res.status(404).json({ error: 'Todos not found' });
            }

            res.json(todos);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    private async handleTodoGetSingle(req: Request, res: Response) {
        try {
            let owner: string;
            try {
                const token: string = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.SECRET);
                owner = (decoded as Token).id;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid JWT token' });
            }

            const todo = await Todo.findById(req.params.id).exec();

            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            if (todo.owner != owner) {
                res.status(403).json({ error: 'Todo was not created by you' });
            }
            res.json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    private async handleTodoUpdate(req: Request, res: Response) {
        try {
            const todo = await Todo.findOne({ _id: req.params.id }).exec();

            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            let owner: string;
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.SECRET);
                owner = (decoded as Token).id;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid JWT token' });
            }

            if (todo.owner != owner) {
                res.status(403).json({ error: 'Todo was not created by you' });
            }

            await Todo.updateOne({ _id: req.params.id }, req.body);

            const updatedTodo = await Todo.findOne({
                _id: req.params.id,
            }).exec();

            res.json(updatedTodo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    private async handleTodoDelete(req: Request, res: Response) {
        try {
            const todo = await Todo.findOne({ _id: req.params.id }).exec();

            if (!todo) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            let owner: string;

            try {
                const token: string = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.SECRET);
                owner = (decoded as Token).id;
            } catch (error) {
                return res.status(401).json({ error: 'Invalid JWT token' });
            }
            if (todo.owner != owner) {
                return res
                    .status(403)
                    .json({ error: 'Todo was not created by you' });
            }
            await Todo.deleteOne({ _id: req.params.id });

            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new TodoController();
