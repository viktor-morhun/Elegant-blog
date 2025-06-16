import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import postsReducer from "./postsSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          "posts.currentPost.createdAt",
          "posts.currentPost.updatedAt",
          "posts.currentPost.comments",
          "posts.posts",
        ],
        ignoredActionPaths: [
          "payload.createdAt",
          "payload.updatedAt",
          "payload.comments",
          "meta.arg",
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
