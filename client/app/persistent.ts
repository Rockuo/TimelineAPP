import * as Redux from "redux";

export const persistenceMiddleware: Redux.Middleware = store => next => action => {
    const result = next(action);
    self.localStorage.setItem('fullState', JSON.stringify(store.getState())); // todo temp
    console.log('saved', self.localStorage.getItem('fullState'))
    return result;
};

export const getInitialData = () => JSON.parse(self.localStorage.getItem('fullState')); // todo temp