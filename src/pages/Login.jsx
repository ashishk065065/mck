import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-register">
      <h2 className="app-heading">Vanaja's</h2>
      <h2 className="app-heading">Mathematical Concept Kit</h2>
      <div className="wrapper">
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
            <label htmlFor="remember">
              <input type="checkbox" id="remember" style={{marginRight: '8px'}}/>
              Remember me
            </label>
          </div>
          <button type="submit">Log In</button>
          <div className="register">
            <p>Don't have an account? <a onClick={() => navigate("/register")}>Register</a></p>
          </div>
        </form>
        {error && <p style={{color:"red"}}>{error}</p>}
      </div>
    </div>
  );
}
