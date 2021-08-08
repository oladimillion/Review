import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { withLoadRoutes } from './hoc/withLoadRoutes'

const Dashboard = React.lazy(() => import('./views/Dashboard')) 
const Login = React.lazy(() => import('./views/Login')) 

export const Routes = withLoadRoutes(() => (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/' component={Dashboard} />
    <Redirect from='/*' to='/login' />
  </Switch>
))
