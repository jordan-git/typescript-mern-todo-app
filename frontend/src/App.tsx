import React from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';

function App() {
    return (
        <div>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/login" exact component={Login} />
                    </Switch>
                </nav>
            </Router>
        </div>
    );
}

export default App;
