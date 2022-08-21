import { useRouter } from 'next/router';

export default function car() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>hello {id}</h1>;
}
