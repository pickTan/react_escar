/**
 * Created by girl on 16/8/1.
 */
import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'


const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});

const enforceImmutableMiddleware = require('redux-immutable-state-invariant')();

//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使action创建函数可以返回一个function代替一个action对象
//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let createStoreWithMiddleware;

    if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containes/DevTools');
    createStoreWithMiddleware = compose(
        applyMiddleware(
            enforceImmutableMiddleware,
            thunkMiddleware,
            promiseMiddleware,
            loggerMiddleware
        ),
        DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
} else {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunkMiddleware, promiseMiddleware)
    )(createStore)
}

/**
 * Creates a preconfigured store.
 */
export default function configureStore (initialState) {
    const store = createStoreWithMiddleware(reducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}



