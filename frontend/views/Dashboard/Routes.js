import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { withLoadRoutes } from '../../hoc/withLoadRoutes'

const Home = React.lazy(() => import('./Home')) 
const UserForm = React.lazy(() => import('./UserForm')) 
const AssignedReviewerForm = React.lazy(() => import('./AssignedReviewerForm')) 
const AssignedReviewerList = React.lazy(() => import('./AssignedReviewerList')) 
const PerformanceReviewForm = React.lazy(() => import('./PerformanceReviewForm')) 
const PerformanceReviewList = React.lazy(() => import('./PerformanceReviewList')) 


export const Routes = withLoadRoutes(() => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/assigned_reviewers' exact component={AssignedReviewerList} />
    <Route 
      path={[
        '/assigned_reviewers/:mode(create)',
        '/assigned_reviewers/:id([0-9a-fA-F-]{20,})',
        '/assigned_reviewers/:id([0-9a-fA-F-]{20,})/:mode(update)',
      ]}
      exact
      component={AssignedReviewerForm} 
    />
    <Route path='/performance_reviews' exact component={PerformanceReviewList} />
    <Route 
      path={[
        '/performance_reviews/:mode(create)',
        '/performance_reviews/:id([0-9a-fA-F-]{20,})',
        '/performance_reviews/:id([0-9a-fA-F-]{20,})/:mode(update)',
      ]}
      exact
      component={PerformanceReviewForm} 
    />
    <Route 
      path={[
        '/user/:mode(create)',
        '/user/:id([0-9a-fA-F-]{20,})',
        '/user/:id([0-9a-fA-F-]{20,})/:mode(update)',
      ]}
      exact
      component={UserForm} 
    />
    <Redirect from='/*' to='/' />
  </Switch>
))

