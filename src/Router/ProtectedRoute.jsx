import React from 'react'

import { useAuthContext } from '../custom-hook/useAuthContext'

import {Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const {user} = useAuthContext();

  return user ? <Outlet/> : <Navigate to= '/login'/>
}

export default ProtectedRoute