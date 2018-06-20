import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import { getUsers } from './actions/users';
import { startSetEvents } from './actions/events';
import { startSetMyEvents } from './actions/myevents'
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from './firebase/firebase';
// import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();

console.log('app');
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
  }

}

ReactDOM.render(

     <div className="login-image">

        <p></p>
        <p>Loading...</p>

     </div>, document.getElementById('app'));




firebase.auth().onAuthStateChanged((user) => {
if(user){

  store.dispatch(login(user.uid))
localStorage.setItem('user_id', user.uid);

store.dispatch(startSetEvents())
     .then(() => {
       console.log('log in');
       store.dispatch(startSetMyEvents())
       renderApp();
       if(history.location.pathname === '/'){
         history.push('/events')
       }
    })


}else{
  store.dispatch(logout())
    console.log('log out');

    renderApp();
    history.push('/')

}
})
