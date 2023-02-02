import React ,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { useLogin } from '../../custom-hook/useLogin'
import './Login.css';


const Login = () => {
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')
    const [role,setRole] =useState('STUDENT');
    const {login ,error,isLoading} =useLogin();
    const navigate =useNavigate()
   
    

    const handleLogin= async (e)=>{
      e.preventDefault();
      await login(email,password,role)
      
    }
  return(<div className='login__container'>
   
      
      <div className='login-form'>
          <h3 className='fw-bold fs-5'>Login</h3>
          <Form className='auth__form b-1'>
              
              <input type="email" className='text-center' placeholder='Enter your email' value={email} onChange={e=>setEmail(e.target.value)} />
             
              <input type="password" className='text-center' placeholder='Enter your password' value={password} onChange={e=>setPassword(e.target.value)}/>
              
          </Form>
          <Form.Select
           aria-label="select example" 
           value={role}
           style={{width:140,height:40,borderRadius:20,paddingLeft:10,outlineColor:'#167d7f',color:'gray'}}
            onChange={(e)=>{setRole(e.target.value)}}
           > 
           
            <option value='STUDENT'>As A Student</option>
            <option value='PROFESSOR'>As A Professor</option>
           
      </Form.Select>
          <button  disabled={isLoading} type='submit' className="btn-login" onClick={handleLogin}>Login</button>
          {error && <div className='error'>{error}</div>}
          </div>
          
          </div>)
     
}

export default Login