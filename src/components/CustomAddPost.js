import axios from 'axios';
import React, { useState } from 'react';

function AddCat({ onAddPost, currentCatImage, setCurrentCatImage, usedImages, }) {
  const [customTitle, setCustomTitle] = useState(''); 

  const handleAddClick = () => {
    axios.get('https://cataas.com/cat')
      .then(response => {
        const newImage = response.data;
        if (!usedImages.includes(newImage)) {
          setCurrentCatImage(newImage); 
          const newPost = {
            id: Date.now(),
            title: customTitle, 
            description: '',
            image: newImage,
          };
          onAddPost(newPost, newImage);
          setCustomTitle('');
        } else {
          alert('Это изображение уже используется. Пожалуйста, выберите другое.');
        }
      })
      .catch(error => {
        console.error('Ошибка при загрузке изображения:', error);
      });
  };

  const handleTitleChange = e => {
    setCustomTitle(e.target.value);
    setCurrentCatImage('https://cataas.com/cat');
  };

  return (
    <div className="add-post">
      <h2>Add a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={customTitle}
        onChange={handleTitleChange}
      />
      <div className="image-container">
        <img src={currentCatImage} alt="Cat" className="cat-image" style={{ width: '300px', height: '300px' }} />
      </div>
      <button onClick={handleAddClick}>Add Post</button>
    </div>
  );
}

export default AddCat;