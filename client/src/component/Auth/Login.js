import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {

 
  const email = useRef();
  
  const password = useRef();
const  navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault(); //avoid page refresh on submit
    const user = {
      
      email: email.current.value,
    
      password: password.current.value
    };
    try {
      await axios.post(`/api/v1/auth/login`, user).then(res => {
        toast.success('user logged successfully');
        localStorage.setItem('loginToken', true);
        navigate('/')
        window.location.reload();
      }).catch(err => toast.error(err.response.data.msg));
        
      } 
      catch (error) {
        toast.error(error.response.user.msg)
      }

    // console.log('data =', data)
    
    //   toast.success('user Logined successfully');
    //   navigate('/')
    }
   

  return (
    <div>
      
      <form action='' autoComplete='off' onSubmit={submitHandler}>
       
        
   
     <div>
      <label htmlFor='email'>email</label>
      <input type='email' name='email' id='email' ref={email} />
    </div>
    
    <div>
      <label htmlFor="password">Password</label>
      <input type='password' name='password' id='pwd' ref={password} />
    </div>
     
     <input type="submit" value="submit" /> 
    </form>
    
    </div>
    
  )
}

export default Login





















// registerUser.create(data)
    // .then(res => {
      //toast
      //   window.location.href = "/";
    // }).catch(err=>toast.error(err.message))