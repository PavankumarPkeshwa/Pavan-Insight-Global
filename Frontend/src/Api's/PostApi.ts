// src/api/postApi.ts
import axiosInstance from "./axiosInstance";
import type { PostType } from "../types/PostType"; // define types if you're using TypeScript
 // define types if you're using TypeScript

// Get all posts
export const fetchPosts = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

// Create a new post
export const createPost = async (newPost: PostType) => {
  const response = await axiosInstance.post("/posts", newPost);
  return response.data;
};
