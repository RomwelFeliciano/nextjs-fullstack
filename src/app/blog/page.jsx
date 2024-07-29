import PostCard from '@/components/postCard/PostCard';
import styles from './blog.module.css';
import { getPosts } from '@/lib/data';

// FETCHING DATA WITH AN API
const getData = async () => {
  const res = await fetch(
    'https://nextjsfullstack-template.netlify.app/api/blog',
    {
      next: { revalidate: 3600 }, //refresh data every hour
    }
  );

  if (!res.ok) {
    throw new Error('Something went wrong!');
  }

  return res.json();
};
export const metadata = {
  title: 'Blog Page',
  description: 'Blog description',
};

const BlogPage = async () => {
  const posts = await getData();

  // FETCHING DATA WITHOUT AN API
  // const posts = await getPosts();

  if (posts.length < 1) {
    return (
      <div className={styles.container}>
        <h1 className={styles.empty}>No Posts</h1>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
