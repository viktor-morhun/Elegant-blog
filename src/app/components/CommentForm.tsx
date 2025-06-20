"use client";

import React, { useState, useCallback } from "react";
import { FiSend, FiAlertCircle } from "react-icons/fi";
import { useAppDispatch } from "@/store/hooks";
import { addCommentRequest } from "@/store/postsSlice";
import { CommentInput } from "@/models/post";
import styles from "./CommentForm.module.css";

interface CommentFormProps {
  postId: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthor(e.target.value);
    },
    []
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!author.trim() || !text.trim()) {
        setError("Please fill in all fields");
        return;
      }

      try {
        setIsSubmitting(true);
        setError(null);

        const commentData: CommentInput = {
          author: author.trim(),
          text: text.trim(),
        };

        await dispatch(addCommentRequest({ postId, comment: commentData }));
        setText("");
      } catch (err) {
        setError("Failed to add comment. Please try again.");
        console.error("Error adding comment:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [author, text, dispatch, postId]
  );

  return (
    <div className={styles.commentFormContainer}>
      <h3 className={styles.formTitle}>Leave a Comment</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && (
          <div className={styles.errorMessage}>
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>
            Your Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            className={styles.input}
            placeholder="Enter your name"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment" className={styles.label}>
            Comment
          </label>
          <textarea
            id="comment"
            value={text}
            onChange={handleTextChange}
            className={styles.textarea}
            placeholder="Write your thoughts here..."
            rows={4}
            disabled={isSubmitting}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || !author.trim() || !text.trim()}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
          <FiSend className={styles.submitIcon} />
        </button>
      </form>
    </div>
  );
};
