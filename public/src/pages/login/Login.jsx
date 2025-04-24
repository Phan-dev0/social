import { useContext, useRef } from "react";
import "./login.css";
import {loginCall} from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';


export default function Login() {

  const email = useRef();
  const password = useRef();

  const {user, isFetching, error, dispatch} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value, 
      password: password.current.value}, dispatch);
  }

  // console.log(user)

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <input 
            type="email" 
            placeholder="Email" 
            className="loginInput"
            required 
            ref={email}
            />
            <input 
            type="password" 
            placeholder="Password" 
            className="loginInput" 
            required
            ref={password}
            />
            <button className="loginButton" disabled={isFetching}>{isFetching? <CircularProgress size="1rem"/> : "Login"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
            {isFetching? <CircularProgress size="1rem"/> : "Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}