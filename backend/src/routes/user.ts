import { Router } from 'express';
import * as jwt from 'express-jwt';

import UserController from '../controllers/user';

const router = Router();

router.post('/login', (req, res) => UserController.handleLogin(req, res));

router.post('/register', (req, res) => UserController.handleRegister(req, res));

export { router };
