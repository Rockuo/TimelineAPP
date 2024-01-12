import { configureStore } from '@reduxjs/toolkit'
import timelines from '../features/timelines/timelinesSlice'
import pages from '../features/pages/pagesSlice'
import { logger } from 'redux-logger'
// import thunk from 'redux-thunk'
import {persistenceMiddleware} from "./persistent";

export const store = configureStore({
    reducer: {timelines, pages,},
    // preloadedState: getInitialData() ?? undefined,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(logger)
        // .concat(thunk)
        .concat(persistenceMiddleware)
    ,
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch