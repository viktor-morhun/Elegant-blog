import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Post, PostInput, Comment, CommentInput } from "@/models/post";

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

const convertFirestorePostToPost = (doc: DocumentData): Post => {
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    author: data.author,
    createdAt: data.createdAt?.toDate().toISOString(),
    updatedAt: data.updatedAt?.toDate().toISOString(),
    comments:
      data.comments?.map((comment: any) => ({
        ...comment,
        createdAt: comment.createdAt?.toDate?.()
          ? comment.createdAt.toDate().toISOString()
          : comment.createdAt instanceof Date
          ? comment.createdAt.toISOString()
          : undefined,
      })) || [],
  };
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(convertFirestorePostToPost);
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId: string) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return convertFirestorePostToPost(docSnap);
    } else {
      throw new Error("Post not found");
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData: PostInput) => {
    const docRef = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      comments: [],
    });

    const newPost = await getDoc(docRef);
    return convertFirestorePostToPost(newPost);
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, postData }: { id: string; postData: PostInput }) => {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });

    const updatedPost = await getDoc(postRef);
    return convertFirestorePostToPost(updatedPost);
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }: { postId: string; comment: CommentInput }) => {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error("Post not found");
    }

    const postData = postSnap.data();
    const comments = postData.comments || [];

    const now = new Date();
    const newComment = {
      ...comment,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: now.toISOString(),
    };

    await updateDoc(postRef, {
      comments: [...comments, newComment],
      updatedAt: serverTimestamp(),
    });

    const updatedPost = await getDoc(postRef);
    return convertFirestorePostToPost(updatedPost);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })

      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.loading = false;
          state.currentPost = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch post";
      })

      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
        state.currentPost = action.payload;
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.currentPost = action.payload;
      })

      .addCase(addComment.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.currentPost = action.payload;
      });
  },
});

export const { clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
