## MERN Stack To Do Application in Typescript (WIP)

## Setup:

1. Open the terminal in the root folder and use the command `npm run install-all` to download all dependencies.
2. Optionally run the commands `npm run install-root`, `npm run install-frontend` and `npm run install-backend` to install dependencies successively.
3. Use `npm run run-all-dev` to host both the backend and the frontend in development mode.

#### Frontend:

1. Use `npm run run-frontend-dev` to host the frontend in development mode.
2. Use `npm run build-frontend` to build the frontend.

#### Backend:

1. Create a file named `.env` in the root directory following the format:

```
MONGO_URI=<uri>
SECRET=<secret>
```

2. Use `npm run run-backend-dev` to host the backend without compiling the TypeScript to JavaScript files (using ts-node-dev).
3. Optionally use `npm run build-backend` followed by `npm run run-backend` to build and execute the production JavaScript files directly.

## Progress:

#### Frontend:

-   `react-router` routing
-   Uses `axios` to send HTTP requests to the backend
-   User registration/authentication and persistence (Using `localStorage` + `cookie`)

#### Backend:

-   `MongoDB` database (`Mongoose`, supports user login/register, RESTful todos)
-   `JSON Web Token` authentication
