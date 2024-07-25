'use server';

import { revalidatePath } from 'next/cache';
import { Post } from './models';
import { connectToDb } from './utils';

export const addPost = async (formData) => {
  //   const title = formData.get('title');
  //   const description = formData.get('description');
  //   const slug = formData.get('slug');

  const { title, description, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      description,
      slug,
      userId,
    });

    await newPost.save();
    revalidatePath('/blog');
    console.log('saved to db');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    revalidatePath('/blog');
    console.log('deleted from db');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};
