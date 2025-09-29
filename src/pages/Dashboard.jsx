import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.log("No user document found!");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setLoggedIn(userData !== null);
  }, [userData])

  return (
    <div>
      {loggedIn && (
      <div className="wrapper">
        <h2>{userData?.name}</h2>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
      )}
    </div>
  );
}
