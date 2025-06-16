"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiEdit,
  FiCalendar,
  FiUser,
  FiClock,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostByIdRequest } from "@/store/postsSlice";
import { CommentForm } from "@/app/components/CommentForm";
import { CommentList } from "@/app/components/CommentList";
import { PostDetailSkeleton } from "@/app/components/LoadingSkeletons";
import AnimatedButton from "@/app/components/AnimatedButton";
import PageTransition from "@/app/components/PageTransition";
import styles from "./PostDetail.module.css";

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const { currentPost, loading, error } = useAppSelector(
    (state) => state.posts
  );
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostByIdRequest(postId));
    }
  }, [dispatch, postId]);

  if (loading) return <PostDetailSkeleton />;
  if (error)
    return (
      <motion.div
        className={styles.errorContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.errorMessage}>Error: {error}</div>
        <Link href="/" className="btn btn-primary">
          <FiArrowLeft /> Back to Posts
        </Link>
      </motion.div>
    );
  if (!currentPost)
    return (
      <motion.div
        className={styles.errorContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.errorMessage}>Post not found</div>
        <Link href="/" className="btn btn-primary">
          <FiArrowLeft /> Back to Posts
        </Link>
      </motion.div>
    );

  return (
    <PageTransition>
      <div className={styles.postDetail}>
        <div className={styles.postHeader}>
          <AnimatedButton href="/" variant="ghost" icon={<FiArrowLeft />}>
            Back to Posts
          </AnimatedButton>
          <AnimatedButton
            href={`/posts/${postId}/edit`}
            variant="secondary"
            icon={<FiEdit />}
          >
            Edit Post
          </AnimatedButton>
        </div>

        <motion.article
          className={styles.postContent}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className={styles.postTitle}>{currentPost.title}</h1>
          <div className={styles.postMeta}>
            <div className={styles.metaItem}>
              <FiUser className={styles.metaIcon} />
              {currentPost.author}
            </div>
            <div className={styles.metaItem}>
              <FiCalendar className={styles.metaIcon} />
              {currentPost.createdAt
                ? new Date(currentPost.createdAt).toLocaleDateString()
                : "Unknown date"}
            </div>
            {currentPost.updatedAt &&
              currentPost.updatedAt !== currentPost.createdAt && (
                <div className={styles.metaItem}>
                  <FiClock className={styles.metaIcon} />
                  Updated:{" "}
                  {new Date(currentPost.updatedAt).toLocaleDateString()}
                </div>
              )}
          </div>

          <div className={styles.postBody}>
            {currentPost.content.split("\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.article>

        <motion.div
          className={styles.commentsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2>Comments ({currentPost.comments?.length || 0})</h2>
          <CommentList comments={currentPost.comments || []} />
          <CommentForm postId={postId} />
        </motion.div>
      </div>
    </PageTransition>
  );
}
