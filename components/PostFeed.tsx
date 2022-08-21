import _ from 'lodash';
import Link from '../node_modules/next/link';

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

const PostItem = ({ post, admin = false }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>by @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesRead} min read
        </span>
        <span>💗 {post.heartCount || 0}</span>
      </footer>
    </div>
  );
};
