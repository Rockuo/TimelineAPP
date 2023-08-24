import { configureStore } from '@reduxjs/toolkit'
import timelines from '../features/timelines/timelineSlice'
import { logger } from 'redux-logger'
import {persistenceMiddleware} from "./persistent";

export const store = configureStore({
    reducer: {
        timelines
    },
    // preloadedState: getInitialData() ?? undefined,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(logger)
        .concat(persistenceMiddleware)
    ,
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch