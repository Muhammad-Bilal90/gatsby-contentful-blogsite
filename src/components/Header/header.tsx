import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { store, toggleAuthPageState, toggleAuthPage } from "../../redux/AuthPageReducer";
import { AuthState } from '../../redux/AuthPageReducer';
import { useSelector } from "react-redux";
import AuthModal from '../AuthModal/authModal';
import { getAuth, onAuthStateChanged, User, Auth } from 'firebase/auth';
// import { FadeMenu } from './MenuList';
import { Button, Paper, Menu, MenuItem, MenuList, Fade } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { signoutUser } from '../Auth/auth';
// import app from 'gatsby-plugin-firebase-v9.0';
import { useState } from 'react';


// const auth = initializeAuth(app)
// const app = initializeApp(app);

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));


export default function Header() {
  // console.log(app)
  const showAuthPage = useSelector((state: AuthState) => state.showAuthPage)
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    //     const auth: Auth = getAuth(app);
    // const unsubsrcibe = onAuthStateChanged(auth, (user) => {
    //   setUser(user)
    // })
    // return unsubsrcibe

    let unSubscribe = true;

    function fetchUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (unSubscribe && user) {
          setUserName(user.displayName);
          setUser(user);
          console.log(user);
        } else {
          setUser(null);
        }
      });
    }

    fetchUser();
    return () => { unSubscribe = true };

  }, []);

  return (
    <>
      <AppBar className='header'>
        <Toolbar>
          <Typography variant="h5" noWrap sx={{ flexGrow: 1 }} component="div">
            Blogs Universe
          </Typography>
          {!!user && user.displayName ?
            <div>
              <div>
                <Button
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <KeyboardArrowDownIcon style={{ color: "white" }} />
                </Button>
                <Paper>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem>Hi, {user.displayName}</MenuItem>
                    <MenuItem onClick={signoutUser}>Logout</MenuItem>
                  </Menu>
                </Paper>
              </div>
            </div>
            :
            <Button onClick={() => {
              store.dispatch(toggleAuthPageState("Login"))
              store.dispatch(toggleAuthPage(true))
            }} variant="outlined" className='headerButton'>Get Started</Button>}
        </Toolbar>
        {showAuthPage && <AuthModal />}
      </AppBar>
    </>
  );
}
