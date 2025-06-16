"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import { Post } from "@/models/post";
import styles from "./FeaturedCard.module.css";

interface FeaturedCardProps {
  post: Post;
}

export default function FeaturedCard({ post }: FeaturedCardProps) {
  if (!post) return null;

  return (
    <motion.div
      className={styles.featuredCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.content}>
        <div className={styles.featuredBadge}>Featured Post</div>
        <h3 className={styles.title}>{post.title}</h3>
        <div className={styles.meta}>
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
        <p className={styles.excerpt}>
          {post.content.length > 200
            ? `${post.content.substring(0, 200)}...`
            : post.content}
        </p>
        <Link href={`/posts/${post.id}`} className={styles.readMore}>
          Read Full Article <FiArrowRight className={styles.readMoreIcon} />
        </Link>
      </div>
    </motion.div>
  );
}
