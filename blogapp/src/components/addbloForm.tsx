"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    const router = useRouter();
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    
    const handleTextChange = (e) => {
        setcontent(e.target.value);
    };
    
    const handleSubmit = async () => {
        console.log('Title:', title);
        console.log('Blog Text:', content);
        
        await axios.post('/api/setBlogs', {
            content,
            title,
            task: "post",
        })
        .then(() => {
                router.push('/explore');
        })
        .catch(() => {
    
        })
    };
  
    return (
      <div className="max-w-xl mx-auto p-6 bg-gray-200 mt-20 shadow-md rounded-md">
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter the title..."
        />
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
          value={content}
          onChange={handleTextChange}
          placeholder="Enter your blog text..."
          rows={10}
          style={{ overflowY: 'auto' }}
        />
        <button
          className="block w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    );
};
  
export default BlogForm;
