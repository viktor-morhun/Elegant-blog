import { takeLatest, put, call, all } from 'redux-saga/effects';
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
import {
  FETCH_POSTS,
  FETCH_POST_BY_ID,
  CREATE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostByIdStart,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  createPostSuccess,
  updatePostSuccess,
  addCommentSuccess,
} from '../postsSlice';
import { Post, PostInput, CommentInput } from "@/models/post";

function convertFirestorePostToPost(doc: DocumentData): Post {
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
}

function* fetchPosts(): Generator<any, any, any> {
  try {
    yield put(fetchPostsStart());
    const querySnapshot: any = yield call(() => getDocs(collection(db, "posts")));
    const posts = querySnapshot.docs.map(convertFirestorePostToPost);
    yield put(fetchPostsSuccess(posts));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message || "Failed to fetch posts"));
  }
}

function* fetchPostById(action: { type: string; payload: string }): Generator<any, any, any> {
  try {
    yield put(fetchPostByIdStart());
    const postId = action.payload;
    const docRef: any = doc(db, "posts", postId);
    const docSnap: any = yield call(() => getDoc(docRef));

    if (docSnap.exists()) {
      const post = convertFirestorePostToPost(docSnap);
      yield put(fetchPostByIdSuccess(post));
    } else {
      throw new Error("Post not found");
    }
  } catch (error: any) {
    yield put(fetchPostByIdFailure(error.message || "Failed to fetch post"));
  }
}

function* createPost(action: { type: string; payload: PostInput }): Generator<any, any, any> {
  try {
    const postData = action.payload;
    const docRef: any = yield call(() =>
      addDoc(collection(db, "posts"), {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        comments: [],
      })
    );

    const newPost: any = yield call(() => getDoc(docRef));
    const convertedPost = convertFirestorePostToPost(newPost);
    yield put(createPostSuccess(convertedPost));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message || "Failed to create post"));
  }
}

function* updatePost(action: {
  type: string;
  payload: { id: string; postData: PostInput };
}): Generator<any, any, any> {
  try {
    const { id, postData } = action.payload;
    const postRef: any = doc(db, "posts", id);

    yield call(() =>
      updateDoc(postRef, {
        ...postData,
        updatedAt: serverTimestamp(),
      })
    );

    const updatedPost: any = yield call(() => getDoc(postRef));
    const convertedPost = convertFirestorePostToPost(updatedPost);
    yield put(updatePostSuccess(convertedPost));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message || "Failed to update post"));
  }
}

function* addComment(action: {
  type: string;
  payload: { postId: string; comment: CommentInput };
}): Generator<any, any, any> {
  try {
    const { postId, comment } = action.payload;
    const postRef: any = doc(db, "posts", postId);
    const postSnap: any = yield call(() => getDoc(postRef));

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

    yield call(() =>
      updateDoc(postRef, {
        comments: [...comments, newComment],
        updatedAt: serverTimestamp(),
      })
    );

    const updatedPost: any = yield call(() => getDoc(postRef));
    const convertedPost = convertFirestorePostToPost(updatedPost);
    yield put(addCommentSuccess(convertedPost));
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message || "Failed to add comment"));
  }
}

function* watchFetchPosts(): Generator<any, any, any> {
  yield takeLatest(FETCH_POSTS, fetchPosts);
}

function* watchFetchPostById(): Generator<any, any, any> {
  yield takeLatest(FETCH_POST_BY_ID, fetchPostById);
}

function* watchCreatePost(): Generator<any, any, any> {
  yield takeLatest(CREATE_POST, createPost);
}

function* watchUpdatePost(): Generator<any, any, any> {
  yield takeLatest(UPDATE_POST, updatePost);
}

function* watchAddComment(): Generator<any, any, any> {
  yield takeLatest(ADD_COMMENT, addComment);
}

export default function* postsSaga(): Generator<any, any, any> {
  yield all([
    watchFetchPosts(),
    watchFetchPostById(),
    watchCreatePost(),
    watchUpdatePost(),
    watchAddComment(),
  ]);
}
