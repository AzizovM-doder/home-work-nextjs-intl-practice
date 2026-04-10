import { configureStore } from '@reduxjs/toolkit'
import { TodoApi } from '../api/todo'
import { Todo2Api } from '../api/todo2'

export const store = configureStore({
  reducer: {
    //  [TodoApi.reducerPath]: TodoApi.reducer,
     [Todo2Api.reducerPath]: Todo2Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Todo2Api.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch