import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        level: 1,
        overallScore: 0,
        createdAt: new Date().toISOString()
      });

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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div class="input-field">
            <input type="text" required onChange={(e) => setName(e.target.value)} />
            <label>Name</label>
          </div>
          <div class="input-field">
            <input type="text" required onChange={(e) => setEmail(e.target.value)}/>
            <label>Email</label>
          </div>
          <div class="input-field">
            <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
            <label>Password</label>
          </div>
          <button type="submit" className="mt-12">Sign Up</button>
          <div class="register">
            <p>Already registered? <a onClick={() => navigate("/")}>Login</a></p>
          </div>
        </form>
        {error && <p style={{color:"red"}}>{error}</p>}
      </div>
    </div>
  );
}
