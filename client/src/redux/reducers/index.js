import { combineReducers } from 'redux';
import { conntectRouter } from 'connected-react-router';

const createRootReducer = (history) => combineReducers({
    router: conntectRouter(history),
})

export default createRootReducer;