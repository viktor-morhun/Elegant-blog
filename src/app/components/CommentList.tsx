"use client";

import React from "react";
import { FiUser, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { Comment } from "@/models/post";
import styles from "./CommentList.module.css";

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const formatTimestamp = (dateString?: string) => {
    if (!dateString) return "just now";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.round(diffMs / (1000 * 60));

      if (diffMins < 5) return "just now";
      if (diffMins < 60)
        return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;

      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24)
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;

      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 30)
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
    } catch (e) {
      return "unknown time";
    }
  };

  if (!comments || comments.length === 0) {
    return (
      <div className={styles.emptyComments}>
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className={styles.commentList}>
      {comments.map((comment, index) => (
        <motion.div
          key={comment.id || index}
          className={styles.commentItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={styles.commentHeader}>
            <div className={styles.commentAuthor}>
              <FiUser className={styles.authorIcon} />
              <span>{comment.author}</span>
            </div>
            <div className={styles.commentTime}>
              <FiClock className={styles.timeIcon} />
              <time dateTime={comment.createdAt || new Date().toISOString()}>
                {formatTimestamp(comment.createdAt)}
              </time>
            </div>
          </div>
          <div className={styles.commentContent}>{comment.text}</div>
        </motion.div>
      ))}
    </div>
  );
};
