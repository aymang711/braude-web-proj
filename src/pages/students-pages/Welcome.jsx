import React from 'react'
import '../../styles/welcome.css'
import { useAuthContext } from '../../custom-hook/useAuthContext'


const Welcome = () => {
  const {user} = useAuthContext();
 
  return (
    <>
    <div className='welcome-container'>
        
          <h2 className='text-welcome'>welcome to your class</h2><br/>
          <h3> you can get a target , if you have a plan !!</h3>
          
      
       
    </div>
   
    </>
  )
}

export default Welcome