import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/home');
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });
        await auth.signOut();
        alert("Registration successful. Please log in.");
        setIsLogin(true);
        setForm({ name: '', email: '', password: '' });
      }
    } catch (err) {
  // Error codes 
  let friendlyMessage = '';
  switch (err.code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      friendlyMessage = 'Incorrect Email or Password.';
      break;
    case 'auth/email-already-in-use':
      friendlyMessage = 'This email is already registered.';
      break;
    case 'auth/weak-password':
      friendlyMessage = 'Password should be at least 6 characters.';
      break;
    case 'auth/invalid-email':
      friendlyMessage = 'Please enter a valid email address.';
      break;
    default:
      friendlyMessage = err.message;
  }
  setError(friendlyMessage);
}
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <p style={{ marginTop: 10 }}>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#1e1e1e',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
    minWidth: '200px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px'
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #444',
    backgroundColor: '#2b2b2b',
    color: 'white'
  },
  button: {
    padding: '10px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  switchButton: {
    backgroundColor: 'transparent',
    color: '#90caf9',
    border: 'none',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  }
};
