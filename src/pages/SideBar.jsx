import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CalculateIcon from '@mui/icons-material/Calculate';
import './Dashboard.css';

export default function SideBar({
  userData,
  toggleSidebar,
  sidebarOpen,
  handleSignOut,
  setSelectedMenuItem,
  isCalculatorOpen,
  setIsCalculatorOpen,
}) {
  return (
    <>
      {!sidebarOpen ? (
        <div className="sidebar-closed">
          <div className="top-icons">
            <IconButton onClick={() => setSelectedMenuItem('home')}>
              <HomeIcon />
            </IconButton>
            {/*<IconButton onClick={() => setSelectedMenuItem('score')}>*/}
            {/*  <SportsScoreIcon />*/}
            {/*</IconButton>*/}
            <IconButton onClick={() => setSelectedMenuItem('kit')}>
              <FullscreenIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsCalculatorOpen(!isCalculatorOpen);
              }}
            >
              <CalculateIcon />
            </IconButton>
          </div>
          <div className="bottom-icons">
            <IconButton onClick={toggleSidebar}>
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
            <IconButton onClick={handleSignOut}>
              <LogoutIcon />
            </IconButton>
            <IconButton>
              <ProfileIcon />
            </IconButton>
          </div>
        </div>
      ) : (
        <div className="sidebar-open">
          <div className="top-icons">
            <div>
              <IconButton onClick={() => setSelectedMenuItem('home')}>
                <HomeIcon />
              </IconButton>
              <span className="icon-label">Home</span>
            </div>
            {/*<div>*/}
            {/*  <IconButton onClick={() => setSelectedMenuItem('score')}>*/}
            {/*    <SportsScoreIcon />*/}
            {/*  </IconButton>*/}
            {/*  <span className="icon-label">Scores</span>*/}
            {/*</div>*/}
            <div>
              <IconButton onClick={() => setSelectedMenuItem('kit')}>
                <FullscreenIcon />
              </IconButton>
              <span className="icon-label">Concept Kit</span>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  setIsCalculatorOpen(!isCalculatorOpen);
                }}
              >
                <CalculateIcon />
              </IconButton>
              <span className="icon-label">Calculator</span>
            </div>
          </div>
          <div className="bottom-icons">
            <div>
              <IconButton onClick={toggleSidebar}>
                <KeyboardDoubleArrowLeftIcon />
              </IconButton>
            </div>
            <div>
              <IconButton onClick={handleSignOut}>
                <LogoutIcon />
              </IconButton>
              <span className="icon-label">Sign Out</span>
            </div>
            <div>
              <IconButton>
                <ProfileIcon />
              </IconButton>
              <span className="icon-label">{userData.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
