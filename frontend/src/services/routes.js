//React router dom para navegação de rotas
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import New from '../pages/New';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    )
}
