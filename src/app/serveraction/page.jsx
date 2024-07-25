import { addPost, deletePost } from '@/lib/action';
import React from 'react';

const ServerAction = () => {
  return (
    <div>
      <form action={addPost}>
        <input type='text' placeholder='title' name='title' />
        <input type='text' placeholder='description' name='description' />
        <input type='text' placeholder='slug' name='slug' />
        <input type='text' placeholder='userId' name='userId' />
        <button>Create</button>
      </form>

      <form action={deletePost}>
        <input type='text' placeholder='postId' name='id' />
        <button>Delete</button>
      </form>
    </div>
  );
};

export default ServerAction;
