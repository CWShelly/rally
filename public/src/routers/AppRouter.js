import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import Dashboard from '../components/Dashboard';

import LogIn  from '../components/LogIn';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../components/NotFound';
import AddEvent from '../components/AddEvent';
import EditEvent from '../components/EditEvent';
// import ViewChapterSummaryPage from '../components/ViewChapterSummaryPage';

// import Profile from '../components/Profile';
// import EditProfile from '../components/EditProfile';
// import ViewOtherLibraries from '../components/ViewOtherLibraries';

import ViewEvents from '../components/ViewEvents'
import ViewMyEvents from '../components/ViewMyEvents'
// import ViewUsers from '../components/ViewUsers'

export const history = createHistory();

const AppRouter = ()=>(
  <Router history={history}>

  <div>


  <Switch>
    <PublicRoute path="/" component={LogIn} exact={true} />
    <PrivateRoute path="/events" component={ViewEvents} />
    <PrivateRoute path="/myevents" component={ViewMyEvents} />
    <PrivateRoute path="/addevent" component={AddEvent} />
    <PrivateRoute path="/editevent/:id" component={EditEvent} />
  <Route component={NotFound} />
  </Switch>
  </div>
  </Router>
)


export default AppRouter;
