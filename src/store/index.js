/* eslint-disable import/no-extraneous-dependencies */
import { create } from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://platform.cs52.me/api/posts';
const API_KEY = '?key=s_shawalem'; // Replace with your actual API key

// Used Github copilot to write out try and error blocks then changed them to git my code
const useStore = create(devtools((set) => ({
  posts: [],
  currentPost: null,

  fetchAllPosts: async () => {
    try {
      const response = await axios.get(`${API_URL}${API_KEY}`);
      set({ posts: response.data });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      toast.error(`Failed to fetch posts: ${error.message}`, {
        position: 'top-right',
      });
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
      toast.error(`Failed to fetch post: ${error.message}`, {
        position: 'top-right',
      });
      set({ currentPost: null });
    }
  },

  createPost: async (post) => {
    try {
      const response = await axios.post(`${API_URL}${API_KEY}`, post);
      toast.success('Added new post !', {
        position: 'top-right',
      });
      set((state) => ({ posts: [...state.posts, response.data] }));
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error(`Failed to create post: ${error.message}`, {
        position: 'top-right',
      });
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
      toast.error(`Failed to update post: ${error.message}`, {
        position: 'top-right',
      });
    }
  },

  deletePost: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}${API_KEY}`);
      toast.success('Deleted ppst !', {
        position: 'top-right',
      });
      set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error(`Failed to delete post: ${error.message}`, {
        position: 'top-right',
      });
    }
  },

})));

export default useStore;
