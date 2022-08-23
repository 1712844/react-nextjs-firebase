import AuthCheck from '../../components/AuthCheck';
import MetaTags from '../../components/Metagtags';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck></AuthCheck>
    </main>
  );
}
