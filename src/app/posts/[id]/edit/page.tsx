"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostById } from "@/store/postsSlice";
import PostForm from "@/app/components/PostForm";
import { PostDetailSkeleton } from "@/app/components/LoadingSkeletons";
import styles from "./EditPost.module.css";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const { currentPost, loading, error } = useAppSelector(
    (state) => state.posts
  );
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, postId]);

  if (loading) return <PostDetailSkeleton />;

  if (error)
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>Error: {error}</div>
        <Link href="/" className={styles.backButton}>
          <FiArrowLeft /> Back to Posts
        </Link>
      </div>
    );

  if (!currentPost)
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>Post not found</div>
        <Link href="/" className={styles.backButton}>
          <FiArrowLeft /> Back to Posts
        </Link>
      </div>
    );

  return (
    <div className={styles.editPostPage}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FiEdit className={styles.headerIcon} /> Edit Post
        </h2>
        <Link href={`/posts/${postId}`} className={styles.backLink}>
          <FiArrowLeft /> Back to Post
        </Link>
      </div>
      <PostForm initialData={currentPost} isEdit={true} />
    </div>
  );
}
