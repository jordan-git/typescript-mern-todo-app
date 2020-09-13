import { Router } from 'express';

import TodoController from '../controllers/todo';
import { isLoggedIn } from '../middleware/auth';

const router = Router();

router.get('/todos', isLoggedIn, async (req, res) =>
    TodoController.handleTodo(req, res)
);

router.get('/todos/:id', isLoggedIn, async (req, res) =>
    TodoController.handleTodo(req, res)
);

router.post('/todos', isLoggedIn, async (req, res) =>
    TodoController.handleTodo(req, res)
);

router.put('/todos/:id', isLoggedIn, async (req, res) =>
    TodoController.handleTodo(req, res)
);

router.delete('/todos/:id', isLoggedIn, async (req, res) =>
    TodoController.handleTodo(req, res)
);

export { router };
