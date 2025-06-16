"use client";

import { FiArrowLeft, FiEdit } from "react-icons/fi";
import PostForm from "../components/PostForm";
import AnimatedButton from "../components/AnimatedButton";
import PageTransition from "../components/PageTransition";
import styles from "./NewPost.module.css";

export default function NewPostPage() {
  return (
    <PageTransition>
      <div className={styles.newPostPage}>
        <div className={styles.header}>
          <h2>
            <FiEdit className={styles.headerIcon} /> Create New Post
          </h2>
          <AnimatedButton href="/" variant="ghost" icon={<FiArrowLeft />}>
            Back to Posts
          </AnimatedButton>
        </div>
        <PostForm />
      </div>
    </PageTransition>
  );
}
