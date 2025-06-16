"use client";

import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import PostList from "./components/PostList";
import AnimatedButton from "./components/AnimatedButton";
import PageTransition from "./components/PageTransition";
import styles from "./page.module.css";

export default function Home() {
  return (
    <PageTransition>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.heroTitle}>Welcome to Elegant Blog</h1>
        <p className={styles.heroSubtitle}>
          Discover interesting stories and share your thoughts
        </p>
        <motion.div
          className={styles.heroActions}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatedButton
            href="/new-post"
            variant="primary"
            size="lg"
            icon={<FiPlusCircle />}
          >
            Create New Post
          </AnimatedButton>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.postsHeader}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2>Latest Posts</h2>
      </motion.div>

      <PostList />
    </PageTransition>
  );
}
