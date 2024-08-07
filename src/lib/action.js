'use server';

import { revalidatePath } from 'next/cache';
import { Post, User } from './models';
import { connectToDb } from './utils';
import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';

// Add Post Data
export const addPost = async (previousState, formData) => {
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
    revalidatePath('/admin');
    console.log('saved to db');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

// Delete Post Data
export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    revalidatePath('/blog');
    revalidatePath('/admin');
    console.log('deleted from db');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

// Add User Data
export const addUser = async (previousState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log('saved to db');
    revalidatePath('/admin');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

// Delete User Data
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath('/admin');
    console.log('deleted from db');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

// Github Login
export const handleGithubLogin = async () => {
  await signIn('github');
};

// Logout
export const handleLogout = async () => {
  await signOut();
};

// Register User
export const handleRegister = async (previousState, formData) => {
  const { username, email, password, img, confirmPassword } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    // return 'Passwords do not match!';
    // throw  new Error("Passwords do not match!") But Not a good Idea
    return { error: 'Passwords do not match!' };
  }

  try {
    connectToDb();
    const user = await User.findOne({ username });

    if (user) {
      // return 'User already exist!';
      return { error: 'User already exist!' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log('saved to db');

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

// Login User
export const handleLogin = async (formData) => {
  //Previous State is needed when using useFormState Hook
  const { username, password } = Object.fromEntries(formData);
  try {
    const response = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    revalidatePath('/');
    return response;
  } catch (err) {
    console.log(err);
    if (err.message.includes('CredentialsSignin')) {
      return { error: 'Invalid username or password!' };
    }
    throw err;
  }
};
