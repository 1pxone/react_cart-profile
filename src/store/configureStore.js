import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();
const middleware = routerMiddleware(history);

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, middleware)
        )
    );
}
