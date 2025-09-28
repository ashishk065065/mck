import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loading from '../assets/Loading'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDemoLogin, setIsDemoLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
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
    setLoading(false);
    if (success) {
      navigate("/dashboard");
    }
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setEmail(import.meta.env.VITE_EMAIL);
    setPassword(import.meta.env.VITE_PASSWORD);
    setIsDemoLogin(true);
  }

  useEffect(() => {
    if (isDemoLogin && email && password) {
      handleLogin({ preventDefault: () => {} });
      setIsDemoLogin(false);
    }
  }, [isDemoLogin, email, password]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="login-register">
          <h2 className="app-heading">Vanaja's</h2>
          <h2 className="app-heading">Mathematical Concept Kit</h2>
          <div className={error ? 'error-wrapper' : 'wrapper'}>
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              <div className="input-field">
                <input type="text" required onChange={(e) => setEmail(e.target.value)}/>
                <label>Email</label>
              </div>
              <div className="input-field">
                <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <label>Password</label>
              </div>
              <div className="forget">
                <a href='#' onClick={demoLogin}>Forgot password?</a>
              </div>
              <button type="submit">Log In</button>
              <div className="register">
                <p>Don't have an account? <a onClick={() => navigate("/register")}>Register</a></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
