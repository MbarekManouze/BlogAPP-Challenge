import { useState } from 'react';

const BlogForm = () => {
  const [blogText, setBlogText] = useState('');
  const [emoji, setEmoji] = useState('');

  const handleTextChange = (e) => {
    setBlogText(e.target.value);
  };

  const handleEmojiChange = (e) => {
    setEmoji(e.target.value);
  };

  const insertEmoji = () => {
    setBlogText(blogText + emoji);
    setEmoji('');
  };

  return (
    <div>
      <textarea
        value={blogText}
        onChange={handleTextChange}
        placeholder="Enter your blog text..."
        rows={10}
        cols={50}
      />
      <br />
      <input
        type="text"
        value={emoji}
        onChange={handleEmojiChange}
        placeholder="Add an emoji..."
      />
      <button onClick={insertEmoji}>Add Emoji</button>
    </div>
  );
};

export default BlogForm;
