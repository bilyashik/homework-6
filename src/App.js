import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './index.css';
import AddCat from './components/CustomAddPost';
import Cat from "./components/CustomPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [catImage, setCatImage] = useState('');
  const [usedImages, setUsedImages] = useState([]);

  const loadInitialPosts = () => {
    axios.get('https://cataas.com/cat')
      .then(response => {
        const initialPosts = Array.from({ length: 4 }, (_, index) => ({
          id: index,
          image: response.data,
          description: `Post ${index + 1}`,
        }));
        setPosts(initialPosts);
      })
      .catch(error => console.error('Ошибка при загрузке изображения:', error));
  };

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const addPost = (newPost, newImage) => {
    setPosts(prevPosts => [...prevPosts, newPost]);
    setCatImage(newImage);
    setUsedImages(prevImages => [...prevImages, newImage]);
  };

  const editPost = (postId, updatedPost) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = postId => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  return (
    <div className="app"
      style={{
        marginTop: '100px'
      }}
    >
      <h1>Cats API</h1>
      <AddCat
        onAddPost={addPost}
        currentCatImage={catImage}
        setCurrentCatImage={setCatImage}
        usedImages={usedImages}
      />
      <div className="posts">
        {posts.map(post => (
          <Cat
            key={post.id}
            post={post}
            currentCatImage={post.image}
            description={post.description}
            onEditPost={editPost}
            onDeletePost={deletePost}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
