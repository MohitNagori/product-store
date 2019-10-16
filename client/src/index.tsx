import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import reducers from './redux/reducers';
import reduxThunk from 'redux-thunk';

// create store with apply thunk as a middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

render(
    <Provider store={store}>
        <App/>
    </Provider>, document.querySelector('#root'));