import AuthCheck from '../../components/AuthCheck';
import MetaTags from '../../components/Metagtags';
import PostFeed from '../../components/PostFeed';
import { auth, firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from '../../node_modules/next/router';
import { UserContext } from '../../lib/context';
import { useContext, useState } from 'react';
import { kebabCase } from 'lodash';
import styles from '../../styles/Admin.module.css';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  const query = ref.orderBy('createdBy');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage Your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function createPost() {}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Latest Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug: </strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create new post
      </button>
    </form>
  );
}
