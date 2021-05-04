import userReducer from "./reducers"
import {createStore , applyMiddleware } from "redux"
import { composeWithDevTools} from 'redux-devtools-extension'
import logger from "redux-logger"

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

// const store = createStore(reducer, );

export const store = createStore(userReducer , persistedState ,composeWithDevTools(applyMiddleware(logger)))


store.subscribe(() => saveToLocalStorage(store.getState()));


