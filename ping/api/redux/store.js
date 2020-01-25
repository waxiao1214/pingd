import {createStore, applyMiddleware} from 'redux';

// Redux-persist
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers/index';

// Middlewares
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const config = {
    key: 'root',
    storage,
};

const reducer = persistCombineReducers(config, reducers);

export default function configureStore() {
    let store = createStore(reducer, applyMiddleware(thunk, logger));
    let persistor = persistStore(store);

    return {store, persistor};
}
