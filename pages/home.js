import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || 'User');
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <h1>Hey, {name}! You’re successfully logged in.</h1>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
    minWidth: '300px'
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};
