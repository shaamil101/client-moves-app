import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://platform.cs52.me/api/posts';
const API_KEY = '?key=s_shawalem'; // Replace with your actual API key

// Used Github copilot to write out try and error blocks then changed them to git my code
const useStore = create((set) => ({
  posts: [],
  currentPost: null,

  fetchAllPosts: async () => {
    try {
      const response = await axios.get(`${API_URL}${API_KEY}`);
      set({ posts: response.data });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      set({ posts: [] });
    }
  },

  // eslint-disable-next-line consistent-return
  fetchPost: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}${API_KEY}`);
      console.log('trying', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch post:', error);
      set({ currentPost: null });
    }
  },

  createPost: async (post) => {
    try {
      const response = await axios.post(`${API_URL}${API_KEY}`, post);
      set((state) => ({ posts: [...state.posts, response.data] }));
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  },

  updatePost: async (post) => {
    try {
      const response = await axios.put(`${API_URL}/${post.id}${API_KEY}`, post);
      set((state) => ({
        posts: state.posts.map((p) => (p.id === post.id ? response.data : p)),
        currentPost: response.data,
      }));
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  },

  deletePost: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}${API_KEY}`);
      set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  },
}));

export default useStore;
