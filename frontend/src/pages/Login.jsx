import axios from 'axios'
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Login = () => {
const [inputs,setInputs] =useState({
    username: "",
    password:"",
  })
  //handle error if user exist
  const [err,setError] = useState(null)

  //user react dom navigator to navigate to another page
  const navigate = useNavigate()

  //usecontext
  const {login}= useContext(AuthContext);
 

  //handle the change in values
 const handlechange = e =>{
  setInputs(prev => ({...prev,[e.target.name] : e.target.value}))
 }

 //handle submit of form
 const handlesubmit = async e =>{
  e.preventDefault();
 
  try {
 await login(inputs)
 
  navigate("/home");
  }
  catch(err)
  {
    console.log(err)
    setError(err.response.data);
  }
 }
 
 console.log(inputs)
 //create html code


  return (

  
  
   <div  classNameName="loginbody">
   <div  className="containerforlogin">
    <div  className="left-panel">
      <h1>WELCOME TO BLOGMAZE</h1>
      <h2>Insightful Content, Every Day.</h2>
      <p className='loginwelcometext'>"Your ideas belong here — explore, express, and engage with thoughtful blogs from around the world."</p>
    </div>
    <div  className="right-panel">
      <form  className="login-form">
        <h2 className='loginwelcometext'>Login to Continue</h2>
        <p className='loginwelcometext'>Join trending topics, and share your stories.</p>

        <div  className="input-group">
          <label>
            <input type="text" placeholder="User Name" required name='username' onChange={handlechange}/>
          </label>
        </div>

        <div  className="input-group">
          <label>
          
            <input type="password" placeholder="Password" required name='password' onChange={handlechange}/>
          </label>
        </div>

        <button type="submit"  className="btn-primary" onClick={handlesubmit}>Login</button>
        {err &&<p className="loginerrmsg">{err}</p>}

        <p  className="signup-text">
          <span className='loginwelcometext'>Don't you have an account? <Link to="/register">Register</Link></span>
        </p>
      </form>
    </div>
  </div>
  </div>


  )
}

export default Login
