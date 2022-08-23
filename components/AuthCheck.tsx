import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Link from '../node_modules/next/link';

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? username.children
    : username.fallback || <Link href="enter">You must be signed in</Link>;
}
