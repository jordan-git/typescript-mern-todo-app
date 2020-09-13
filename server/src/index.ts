import * as dotenv from 'dotenv';

dotenv.config();

import app from './App';

const port = parseInt(process.env.SERVERPORT) || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));
