 import { createStore, applyMiddleware, compose } from 'redux';
 import thunk from 'redux-thunk'
 import createReducer from './reducers';
 
 export default function configureStore(initialState = {}, history) {
   let composeEnhancers = compose;
 
   if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
     if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
       composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
   }

   const middlewares = [thunk];
 
   const enhancers = [applyMiddleware(...middlewares)];
 
   const store = createStore(
     createReducer(),
     initialState,
     composeEnhancers(...enhancers),
   );
 
   return store;
 }