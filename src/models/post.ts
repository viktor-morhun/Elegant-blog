import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "Comment cannot be empty"),
  author: z.string().min(1, "Author name is required"),
  createdAt: z.string().optional(),
});

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  author: z.string().min(1, "Author name is required"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
export type Post = z.infer<typeof PostSchema>;

export type PostInput = Omit<
  Post,
  "id" | "createdAt" | "updatedAt" | "comments"
>;
export type CommentInput = Omit<Comment, "id" | "createdAt">;
