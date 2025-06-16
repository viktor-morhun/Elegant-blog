"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPost, updatePost } from "@/store/postsSlice";
import { PostSchema, PostInput, Post } from "@/models/post";
import AnimatedButton from "./AnimatedButton";
import styles from "./PostForm.module.css";

interface PostFormProps {
  initialData?: Post;
  isEdit?: boolean;
}

export default function PostForm({
  initialData,
  isEdit = false,
}: PostFormProps = {}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<PostInput>({
    title: "",
    content: "",
    author: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        author: initialData.author,
      });
      setCharCount(initialData.content.length);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "content") {
      setCharCount(value.length);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      PostSchema.parse(formData);

      setIsSubmitting(true);

      if (isEdit && initialData?.id) {
        const result = await dispatch(
          updatePost({
            id: initialData.id,
            postData: formData,
          })
        ).unwrap();

        router.push(`/posts/${result.id}`);
      } else {
        const result = await dispatch(createPost(formData)).unwrap();
        router.push(`/posts/${result.id}`);
      }
    } catch (error: any) {
      if (error.errors) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          const path = err.path[0];
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error submitting post:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className={styles.postForm}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-control ${errors.title ? styles.inputError : ""}`}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="form-error">
              <FiAlertCircle /> {errors.title}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`form-control ${errors.author ? styles.inputError : ""}`}
            placeholder="Enter your name"
            disabled={isEdit}
          />
          {errors.author && (
            <p className="form-error">
              <FiAlertCircle /> {errors.author}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <div className={styles.textareaContainer}>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`form-control ${
                errors.content ? styles.inputError : ""
              }`}
              rows={10}
              placeholder="Write your post content here..."
            ></textarea>
            <div className={styles.charCount}>{charCount} characters</div>
          </div>
          {errors.content && (
            <p className="form-error">
              <FiAlertCircle /> {errors.content}
            </p>
          )}
        </div>

        <div className={styles.formActions}>
          <AnimatedButton
            onClick={() => router.back()}
            variant="outline"
            icon={<FiX />}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            type="submit"
            variant="primary"
            icon={<FiSave />}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Update Post"
              : "Create Post"}
          </AnimatedButton>
        </div>
      </form>
    </motion.div>
  );
}
