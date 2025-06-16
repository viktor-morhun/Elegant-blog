import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

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
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
