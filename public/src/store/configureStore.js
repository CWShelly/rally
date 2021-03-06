import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import eventsReducer from '../reducers/events';
import myEventsReducer from '../reducers/myevents';
import profilesReducer from '../reducers/profiles';
import userReducer from '../reducers/users'
const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;


export default () => {
  const store = createStore(
    combineReducers({

      events: eventsReducer,
      myevents: myEventsReducer,

      auth: authReducer,
      // filters: filtersReducer,
      _users: userReducer,
      profiles:profilesReducer


    }),
    composeEnhanchers(applyMiddleware(thunk))
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
