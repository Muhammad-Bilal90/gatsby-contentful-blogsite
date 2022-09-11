import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';;
import DialogTitle from '@mui/material/DialogTitle';
import Login from '../Login-Signup/login';
import { useSelector } from "react-redux"
import { store, toggleAuthPageState, toggleAuthPage } from "../../redux/AuthPageReducer";
import { AuthState } from '../../redux/AuthPageReducer';
import Signup from '../Login-Signup/signup';

export default function AuthModal() {

  const { showAuthPage, authPageState } = useSelector((state: AuthState) => state);

  return (
    <div>
      <Dialog
        open={showAuthPage}
        onClose={()=>{store.dispatch(toggleAuthPage(false))
            store.dispatch(toggleAuthPageState("Login"))
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {authPageState}
        </DialogTitle>
        <DialogContent style={{ overflowY: "initial" }}>
          {authPageState === "Login" ? <Login /> : <Signup />}
        </DialogContent>
        <DialogActions className='modalCreateButton'>
        {authPageState === "Login"? <Button variant="contained" color="success" onClick={()=>{store.dispatch(toggleAuthPageState("Sign Up"))}}>Create New Account</Button>:
        <Button variant="contained" color="success" onClick={()=>{store.dispatch(toggleAuthPageState("Login"))}}>Already have an account ? Click here to login.</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
