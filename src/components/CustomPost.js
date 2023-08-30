import React, { useState } from 'react';

function Cat({ post, currentCatImage, description, onEditPost, onDeletePost }) {
  const [editing, setEditing] = useState(false);
  const [customTitle, setCustomTitle] = useState(post.title); 
  const [customDescription, setCustomDescription] = useState(description); 

  const handleEditClick = () => setEditing(true);
  const handleSaveClick = () => {
    onEditPost(post.id, { title: customTitle, description: customDescription });
    setEditing(false);
  };
  const handleDeleteClick = () => onDeletePost(post.id);

  return (
    <div className="post">
      <div className="post-card">
        <div className="card-image-container">
          <img src={currentCatImage} alt="Cat" className="card-cat-image" />
        </div>
        <div className="card-content">
          <h3>{customTitle}</h3>
          <p>{customDescription}</p>
        </div>
        <div className="card-buttons">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
      {editing && (
        <div className="post-edit">
          <input
            type="text"
            value={customTitle}
            onChange={e => setCustomTitle(e.target.value)}
          />
          <textarea
            value={customDescription}
            onChange={e => setCustomDescription(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Cat;