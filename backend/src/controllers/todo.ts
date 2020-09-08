import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import Todo from '../models/Todo';

class TodoController {
    // public handleTodo(req: Request, res: Response) {
    //     if (req.method == 'POST') this.handleTodoPost(req, res);
    //     else if (req.method == 'GET') {
    //         if (req.params.id) this.handleTodoGetSingle(req, res);
    //         else this.handleTodoGetAll(req, res);
    //     } else if (req.method == 'PUT') this.handleTodoUpdate(req, res);
    //     else if (req.method == 'DELETE') this.handleTodoDelete(req, res);
    // }
    // private async handleTodoPost(req: Request, res: Response) {
    //     const { description, completed } = req.body;
    //     const token = req.headers.authorization;
    //     let owner: string;
    //     try {
    //         const decoded = jwt.verify(token, process.env.SECRET);
    //         owner = decoded.username;
    //     } catch (error) {
    //         res.status(401).send('Invalid JWT token');
    //         return;
    //     }
    //     const todo = new Todo({ owner, description, completed });
    //     try {
    //         await todo.save();
    //         res.send('Todo created successfully');
    //     } catch (error) {
    //         res.status(500).send('Error creating new todo');
    //     }
    // }
    // private async handleTodoGetAll(req: Request, res: Response) {
    //     const token = req.cookies.token;
    //     let owner: string;
    //     try {
    //         const decoded = jwt.verify(token, process.env.SECRET);
    //         owner = decoded.username;
    //     } catch (error) {
    //         res.status(401).send('Invalid JWT token');
    //         return;
    //     }
    //     try {
    //         const todos = await Todo.find({ owner }).exec();
    //         if (!todos) {
    //             res.status(404).send('Todos not found');
    //             return;
    //         }
    //         res.json(todos);
    //     } catch (error) {
    //         res.status(500).send('Internal server error');
    //     }
    // }
    // private async handleTodoGetSingle(req: Request, res: Response) {
    //     try {
    //         const todo = await Todo.findById(req.params.id).exec();
    //         if (!todo) {
    //             res.status(404).send('Todo not found');
    //             return;
    //         }
    //         let owner: string;
    //         try {
    //             const token = req.headers.authorization;
    //             const decoded = jwt.verify(token, process.env.SECRET);
    //             owner = decoded.username;
    //         } catch (error) {
    //             res.status(401).send('Invalid JWT token');
    //             return;
    //         }
    //         if (todo.owner != owner) {
    //             res.status(403).send('Todo was not created by you');
    //         }
    //         res.json(todo);
    //     } catch (error) {
    //         res.status(500).send('Internal server error');
    //     }
    // }
    // private async handleTodoUpdate(req: Request, res: Response) {
    //     try {
    //         const todo = await Todo.findOne({ _id: req.params.id }).exec();
    //         if (!todo) {
    //             res.status(404).send('Todo not found');
    //             return;
    //         }
    //         let owner: string;
    //         try {
    //             const token = req.cookies.token;
    //             const decoded = jwt.verify(token, process.env.SECRET);
    //             owner = decoded.username;
    //         } catch (error) {
    //             res.status(401).send('Invalid JWT token');
    //             return;
    //         }
    //         if (todo.owner != owner) {
    //             res.status(403).send('Todo was not created by you');
    //         }
    //         await Todo.updateOne({ _id: req.params.id }, req.body);
    //         res.send('Todo successfully updated');
    //     } catch (error) {
    //         res.status(500).send('Internal server error');
    //     }
    // }
    // private async handleTodoDelete(req: Request, res: Response) {
    //     try {
    //         const todo = await Todo.findOne({ _id: req.params.id }).exec();
    //         if (!todo) {
    //             res.status(404).send('Todo not found');
    //             return;
    //         }
    //         let owner: string;
    //         try {
    //             const token = req.cookies.token;
    //             const decoded = jwt.verify(token, process.env.SECRET);
    //             owner = decoded.username;
    //         } catch (error) {
    //             res.status(401).send('Invalid JWT token');
    //             return;
    //         }
    //         if (todo.owner != owner) {
    //             res.status(403).send('Todo was not created by you');
    //             return;
    //         }
    //         await Todo.deleteOne({ _id: req.params.id });
    //         res.send('Todo successfully deleted');
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Internal server error');
    //     }
    // }
}

export default new TodoController();
