"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiMessageCircle,
  FiArrowRight,
  FiUser,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts } from "@/store/postsSlice";
import { PostListSkeleton } from "./LoadingSkeletons";
import FeaturedCard from "./FeaturedCard";
import styles from "./PostList.module.css";

export default function PostList() {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <PostListSkeleton />;
  if (error) return <div className={styles.errorState}>Error: {error}</div>;

  if (posts.length === 0) {
    return (
      <motion.div
        className={styles.emptyState}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.emptyStateIcon}>📝</div>
        <h3>No posts found</h3>
        <p>Create your first post to get started!</p>
      </motion.div>
    );
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <>
      {featuredPost && <FeaturedCard post={featuredPost} />}

      <div className={styles.postGrid}>
        {regularPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className={styles.postCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h3 className={styles.postTitle}>{post.title}</h3>
            <div className={styles.postMeta}>
              <span className={styles.metaItem}>
                <FiUser className={styles.metaIcon} />
                {post.author}
              </span>
              <span className={styles.metaItem}>
                <FiCalendar className={styles.metaIcon} />
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </span>
            </div>
            <p className={styles.postExcerpt}>
              {post.content.length > 150
                ? `${post.content.substring(0, 150)}...`
                : post.content}
            </p>
            <div className={styles.postFooter}>
              <Link href={`/posts/${post.id}`} className={styles.readMoreLink}>
                Read More <FiArrowRight className={styles.readMoreIcon} />
              </Link>
              <span className={styles.commentsCount}>
                <FiMessageCircle className={styles.commentIcon} />
                {post.comments?.length || 0}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
