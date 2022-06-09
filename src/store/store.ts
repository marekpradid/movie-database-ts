import {createStore, applyMiddleware, Action} from 'redux'
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducers/rootReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Dispatch with Thunk support
export type AppDispatch = ThunkDispatch<RootState, void, Action>;