import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import Home from './Home';
import ConceptKit from './ConceptKitComponents/ConceptKit.jsx';
import Score from './Score';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.log('No user document found!');
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setLoggedIn(userData !== null);
  }, [userData]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {loggedIn && (
        <div className="dashboard">
          <SideBar
            userData={userData}
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            handleSignOut={handleSignOut}
            setSelectedMenuItem={setSelectedMenuItem}
          />
          <div className={`dashboard-content ${sidebarOpen ? 'sidebar-open-content' : ''}`}>
            {selectedMenuItem === 'home' ? (
              <Home />
            ) : selectedMenuItem === 'score' ? (
              <Score />
            ) : (
              <div className="conceptKit-div">
                <ConceptKit />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
