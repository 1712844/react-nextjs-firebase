import Navbar from '../components/Navbar';
import '../styles/globals.css';

import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../lib/firebase';
import useUserData from '../lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
