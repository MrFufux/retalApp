import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";

//Middleware
const logger = (store:any) => (next:any) => (action:any) => {
    // console.log("dispatching", action);
    const result = next(action);
    let getDataStorage = JSON.parse(localStorage.getItem('dataStorage') || "[]") || [];
    getDataStorage = [...getDataStorage, action]
    localStorage.setItem('dataStorage', JSON.stringify(getDataStorage));
    return result;
  };

export const store = createStore(
    reducers,
    {},
    applyMiddleware(logger)
)