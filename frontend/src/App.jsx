import React from 'react'

import { Navigate, Route,Routes } from 'react-router-dom'
import Home from './home/home'
import Course from './course/course'
import Signup from './components/signup'
import {Toaster} from "react-hot-toast";
import { useAuth } from './context/AuthProvider'




const App = () => {
  const [authUser,setAuthUser] = useAuth();
  return (
    <div>
    <Routes>
      <Route  path='/' element= {<Home/>} />
      <Route path='/course' element={authUser?<Course/>:<Navigate to ="/signup"/>} />
      <Route path='/signup' element = {<Signup/>} />
      
      
      
    </Routes>
    <Toaster/>
    
    </div>
  )
}

export default App
