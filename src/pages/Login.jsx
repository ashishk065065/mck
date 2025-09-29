import { useState, useEffect, useCallback } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../assets/Loading';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDemoLogin, setIsDemoLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      const start = Date.now();
      let success = false;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        success = true;
      } catch (err) {
        setError(err.message);
      }
      const elapsed = Date.now() - start;
      const minLoading = 500;
      if (elapsed < minLoading) {
        await new Promise((resolve) => setTimeout(resolve, minLoading - elapsed));
      }
      if (success) {
        navigate('/dashboard');
      }
      setLoading(false);
    },
    [email, password, navigate]
  );

  const demoLogin = (e) => {
    e.preventDefault();
    setEmail(import.meta.env.VITE_EMAIL);
    setPassword(import.meta.env.VITE_PASSWORD);
    setIsDemoLogin(true);
  };

  useEffect(() => {
    if (isDemoLogin && email && password) {
      handleLogin({ preventDefault: () => {} });
      setIsDemoLogin(false);
    }
  }, [isDemoLogin, email, password, handleLogin]);

  return (
    <div className="centered-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="login-register">
          <h2 className="app-heading">Mathematical Concept Kit</h2>
          <div className={error ? 'error-wrapper' : 'wrapper'}>
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="forget">
                <button type="button" onClick={demoLogin} className="link-text">
                  Forgot password?
                </button>
              </div>
              <button type="submit">Log In</button>
              <div className="register">
                <p>
                  Don&apos;t have an account?{' '}
                  <Link className="link-button" to={'/register'}>
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
