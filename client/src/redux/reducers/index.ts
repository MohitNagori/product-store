import { combineReducers } from 'redux';
import appReducer from './appReducer';
import productReducer from './productReducer';

// combining reducers as app can have only 1 store
export default combineReducers({
    app: appReducer,
    product: productReducer
})