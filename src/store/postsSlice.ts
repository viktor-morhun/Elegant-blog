import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostInput, CommentInput } from "@/models/post";

export const FETCH_POSTS = "posts/fetchPostsRequest";
export const FETCH_POST_BY_ID = "posts/fetchPostByIdRequest";
export const CREATE_POST = "posts/createPostRequest";
export const UPDATE_POST = "posts/updatePostRequest";
export const ADD_COMMENT = "posts/addCommentRequest";

export const fetchPostsRequest = createAction(FETCH_POSTS);
export const fetchPostByIdRequest = createAction<string>(FETCH_POST_BY_ID);
export const createPostRequest = createAction<PostInput>(CREATE_POST);
export const updatePostRequest = createAction<{
  id: string;
  postData: PostInput;
}>(UPDATE_POST);
export const addCommentRequest = createAction<{
  postId: string;
  comment: CommentInput;
}>(ADD_COMMENT);

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPostByIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostByIdSuccess: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
      state.loading = false;
    },
    fetchPostByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostSuccess: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
      state.currentPost = action.payload;
      state.loading = false;
    },
    updatePostSuccess: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.currentPost = action.payload;
      state.loading = false;
    },
    addCommentSuccess: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.currentPost = action.payload;
      state.loading = false;
    },
  },
});

export const {
  clearCurrentPost,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostByIdStart,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  createPostSuccess,
  updatePostSuccess,
  addCommentSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
