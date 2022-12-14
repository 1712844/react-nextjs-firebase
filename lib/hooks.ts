import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export default function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsub;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsub = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsub;
  }, [user]);

  return { user, username };
}
