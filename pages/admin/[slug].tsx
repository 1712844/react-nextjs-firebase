import { useState } from 'react';
import AuthCheck from '../../components/AuthCheck';
import { auth, firestore } from '../../lib/firebase';
import { useRouter } from '../../node_modules/next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import styles from '../../styles/Admin.module.css';

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug);
  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>
        </>
      )}
    </main>
  );
}

function PostForm() {}
