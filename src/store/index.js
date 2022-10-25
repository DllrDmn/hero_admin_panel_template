import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { combineReducers, createStore , compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';


// const stringMiddleWare = () => (next) => (action) => {  ////next == dispatch
//     if (typeof action === 'string') {
//         return next({
//             type: action
//         })
//     }
//     return next(action);
// }


// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;

//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }
//     return store;
// }


// const store = createStore(
//     combineReducers({heroes, filters}),
//     compose(applyMiddleware(thunk, stringMiddleWare),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     );

const store = configureStore({
    reducer: {heroes, filters},
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production'
    
});

export default store;