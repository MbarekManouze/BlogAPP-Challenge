"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Maincontent = () => {
  
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    idFunc()
    fetchBlogPosts();
  }, []);
  
  const idFunc = async () => {
    await axios.get('/api/getid').then((data) => {
  
      console.log("idddd : ", data);
      setUserId(data.data.id);
    })
    
  }

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get("/api/getBlogs");
      setBlogPosts(response.data.Blogs);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async () => {
    try {
      await axios.post('/api/setBlogs', {
        postid: editingPost,
        content: editContent,
        title: editTitle,
        task: "edit",
      });
      setEditingPost(null);
      fetchBlogPosts();
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post('/api/setBlogs', {
        postid: id,
        task: "delete"
      });
      fetchBlogPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const formatContent = (content) => {
    return content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Blogs</h1>
      {blogPosts.map((blogPost) => (
        <div key={blogPost.id} className="bg-white rounded-lg shadow-2xl shadow-slate-600 mb-4">
          <div className="p-4">
            {editingPost === blogPost.id ? (
              <div className="bg-gray-200 p-4 rounded-lg">
                <input
                  type="text"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                  rows={10}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={{ overflowY: "auto" }}
                />
                <button
                  className="block w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="block w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <div className="border bg-gray-300 inline-block rounded-lg text-center mb-2">
                  <h2 className="text-xl pl-2 pr-2 font-bold m-0 text-red-500">{blogPost.title} :</h2>
                </div>
                <div className="bg-gray-300 pl-6 rounded-lg border border-solid border-gray-300">
                  <p>{formatContent(blogPost.content)}</p>
                </div>
                <div className="flex flex-row items-center">
                  <div className="text-lg pl-2">
                    <span className="font-semibold text-gray-700">Author:</span> <span className="font-bold text-blue-600">{blogPost.author.username}</span>
                  </div>
                  {userId === blogPost.authorId && (
                    <div className="space-x-2 ml-auto">
                      <button
                        className="mt-2 px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                        onClick={() => handleEditClick(blogPost)}
                      >
                        Edit
                      </button>
                      <button
                        className="mt-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(blogPost.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Maincontent;
