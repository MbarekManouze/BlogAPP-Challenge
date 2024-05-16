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
    setEmoji(''); // Clear emoji input after adding to the text
  };

  return (
    <div>
      <textarea
        value={blogText}
        onChange={handleTextChange}
        placeholder="Enter your blog text..."
        rows={10} // Adjust the number of rows according to your preference
        cols={50} // Adjust the number of columns according to your preference
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
