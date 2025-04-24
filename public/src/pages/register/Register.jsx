import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(password.current.value !== confirmPassword.current.value){
      password.current.setCustomValidity("Password don't match");
    }else{
      const serverRoot = process.env.REACT_APP_SERVER_CONNECT;
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try{
        const res = await axios.post(serverRoot + "auth/register", user);
        navigate("/login");
      }catch(error){
        console.log(error);
      }
    
    }

  }

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
              placeholder="Username"
              required 
              ref={username} 
              className="loginInput" />
            <input 
              placeholder="Email"
              required 
              ref={email} 
              className="loginInput" 
              type="email"
              />
            <input 
              placeholder="Password" 
              required
              ref={password} 
              className="loginInput" 
              type="password"
              />
            <input 
              placeholder="Password Again" 
              required
              ref={confirmPassword} 
              className="loginInput" 
              type="password"
            />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}