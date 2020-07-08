 import React from 'react';
import ReactDOM from 'react-dom';

import thunk from 'redux-thunk' ;
import axios from 'axios'
//import App from './Home/Component/Home/App';
//import Userhome from './Users/Component/userhome';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './index.css';
import {createStore,compose,applyMiddleware,combineReducers} from 'redux' ;
import {Provider} from 'react-redux' ;
import App from './App' ;
import authreducer from './store/reducers/auth' ;
import navreducer from './store/reducers/nav' ;
import msgreducer from './store/reducers/message'
import notsreducer from './store/reducers/notifications'



const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore() {

  const rootReducer = combineReducers({
    auth:authreducer,
    nav:navreducer,
    message: msgreducer,
    notification:notsreducer
  })


  const Store = createStore(rootReducer,composeEnhances(
  applyMiddleware(thunk)
)) ;
return Store

}

export const store = configureStore() 


const app = (
  <Provider store={store}>
       <App />
  </Provider>

)




ReactDOM.render(
  
  app
  ,
  document.getElementById('root')
);
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
 axios.defaults.xsrfCookieName = "csrftoken";
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register() ;
//import App from './Home/Component/Home/App';
//import Userhome from './Users/Component/userhome'
//middleware
// if(module.hot) {
//   module.hot.accept('./store/reducers',() =>{
//     const nextRootReducer =require('./store/reducers/auth') ;
//     Store.replaceReducer(nextRootReducer) ;
//   })
// }