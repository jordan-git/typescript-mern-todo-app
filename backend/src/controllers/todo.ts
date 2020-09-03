import { Request, Response } from 'express';

import Todo from '../models/Todo';

class TodoController {
    public handleTodo(req: Request, res: Response) {
        if (req.method == 'POST') this.handleTodoPost(req, res);
        else if (req.method == 'GET') {
            if (req.params.id) this.handleTodoGetSingle(req, res);
            else this.handleTodoGetAll(req, res);
        } else if (req.method == 'UPDATE') this.handleTodoUpdate(req, res);
        else if (req.method == 'DELETE') this.handleTodoDelete(req, res);
    }

    private handleTodoPost(req: Request, res: Response) {}

    private handleTodoGetAll(req: Request, res: Response) {}

    private handleTodoGetSingle(req: Request, res: Response) {}

    private handleTodoUpdate(req: Request, res: Response) {}

    private handleTodoDelete(req: Request, res: Response) {}
}

export default new TodoController();
