import AuthCheck from '../../components/AuthCheck';
import MetaTags from '../../components/Metagtags';
import PostFeed from '../../components/PostFeed';
import { auth, firestore, serverTimestamp } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from '../../node_modules/next/router';
import { UserContext } from '../../lib/context';
import { useContext, useState } from 'react';
import kebabCase from 'lodash.kebabcase';
import styles from '../../styles/Admin.module.css';
import toast from '../../node_modules/react-hot-toast/dist/index';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length >= 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();

    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: 'My first line of content',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heart: 0,
    };

    await ref.set(data);

    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug: </strong> {slug}
      </p>
      <button type="submit" disabled={isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
