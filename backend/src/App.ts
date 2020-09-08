import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import { router as userRouter } from './routes/user';
import { router as todoRouter } from './routes/todo';

dotenv.config();

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.implementMiddleware();
        this.connectToDatabase();
        this.mountRoutes();
    }

    private implementMiddleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(helmet());
        this.express.use(compression());
        this.express.use(cookieParser());
        this.express.use(bodyParser.json());
        this.express.use(cors());
    }

    private connectToDatabase(): void {
        mongoose.set('useCreateIndex', true);
        mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (err) => {
                if (err) throw err;
                else
                    console.log(
                        `Successfully connected to ${process.env.MONGO_URI}`
                    );
            }
        );
    }

    private mountRoutes(): void {
        this.express.use('/api', userRouter);
        this.express.use('/api', todoRouter);

        // 404 route
        this.express.use(
            '*',
            (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => {
                res.status(404).send('Page not found');
            }
        );

        // Error handling route
        this.express.use(
            (
                err: Error,
                req: express.Request,
                res: express.Response,
                next: express.NextFunction
            ) => {
                console.error(err.stack);
                res.status(500).send('Something broke!');
            }
        );
    }
}

export default new App().express;
