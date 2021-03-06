import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from './reducer';

const store = createStore(
    rootReducer,
    composeWithDevTools( applyMiddleware( thunk ) )
);

export default store;
