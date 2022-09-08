// import React, { useRef } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom'
// import useForm from '../../helpers/FormValidation';

// import axios from 'axios'


// function Register() {

//   const name = useRef();
//   const email = useRef();
//   const mobile = useRef();
//   const password = useRef();
//   const navigate = useNavigate();
//   const { errors, validate } = useForm()

// const useValidate = (user) => {
//   validate(user)
// }

  
//   const submitHandler = async (e) => {
//     e.preventDefault(); //avoid page refresh on submit
//     const user = {
//       name:name.current.value,
//       email: email.current.value,
//       mobile: mobile.current.value,
//       password: password.current.value,
     
//     };
//     try {
//       await axios.post(`/api/v1/auth/register`, user).then(res => {
//         toast.success('user Registered successfully');
//         navigate('/')
//       }).catch(err => toast.error(err.response.data.msg));
        
//       } 
//       catch (error) {
//         toast.error(error.response.user.msg)
//       }
      
//   }
//   return (
    
//     <div>

// <div className='container'>
//   <div className='row'>
//     <div className='col-md-6 offset-md-3'>
//       <div className='card'>
//         <div className='card-body'>
//         <form action='' autoComplete='off'  onSubmit={submitHandler}>
//     <div className='form-group mt-1 mb-2'>
//       <label htmlFor='name'>Name</label>
//       <input className='form-control' type='text' name='name' id='name' ref={name} />
//     </div>
//     <div className='form-group'>
//       <label htmlFor='email'>email</label>
//       <input className='form-control' type='email' name='email' id='email' ref={email}  />
//     </div>
//     <div className='form-group'>
//       <label htmlFor='number'>number</label>
//       <input className='form-control' type='number' name='mobile' id='mobile' ref={mobile}  />
//     </div>
//     <div className='form-group'>
//       <label htmlFor="password">Password</label>
//       <input className='form-control' type='password' name='password' id='pwd' ref={password} />
//     </div>
     
//      <input className='btn btn-success' type="submit" value="submit" />
//     </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

      
    
//     </div>
    
//   )
// }

// export default Register





















// // registerUser.create(data)
//     // .then(res => {
//       //toast
//       //   window.location.href = "/";
//     // }).catch(err=>toast.error(err.message))






import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import useForm from '../../helpers/FormValidation'
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  })
 const navigate = useNavigate()
 const {errors, validate} = useForm()

  const readValue = (e) => {
    const { name, value } = e.target;
    validate(name, value)    
    setUser({...user, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        await axios.post(`/api/v1/auth/register`, user).then(res => {
            toast.success("User registerted successfully")
            navigate("/")
        }).catch(err => toast.error(err.response.data.msg));

      } catch (error) {
        toast.error(error.response.data.msg)
      }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Register</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler} >
                  <div className="form-group mt-2 mb-2">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" value={user.name} onChange={readValue} className="form-control" required />
                    {
                      errors && errors.name ? (
                        <div className='alert alert-danger'>{errors.name}</div>
                      ): null
                    }
                  </div>
                <div className="form-group mt-2 mb-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required />
                  {
                      errors && errors.email ? (
                        <div className='alert alert-danger'>{errors.email}</div>
                      ): null
                    }
                  </div>
                <div className="form-group mt-2 mb-2">
                  <label htmlFor="mobile">Mobile</label>
                  <input type="number" name="mobile" id="mobile" value={user.mobile} onChange={readValue} className="form-control" required />
                  {
                      errors && errors.mobile ? (
                        <div className='alert alert-danger'>{errors.mobile}</div>
                      ): null
                    }
                  </div>
                  <div className="form-group mt-2 mb-2">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                    {
                      errors && errors.password ? (
                        <div className='alert alert-danger'>{errors.password}</div>
                      ): null
                    }
                  </div>
                <div className="form-group mt-2 mb-2">
                  <input type="submit" value="Register" className="btn btn-outline-success" />
                  </div>
              </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register