import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  // if(authStatus==true){
  //   navigate('/')
  // }
  // else if(authStatus==false){
  //   navigate('/login')
  // }

  useEffect(() => {
    // if(authentication && authStatus!== 'authentication') {
    //   navigate('/login')
    // } else if(!authentication && authStatus !== 'authentication') {
    //   navigate('/')
    // } 
    if (authentication && !authStatus) {
      navigate('/login')
    } else if (!authentication && authStatus) {
      navigate('/')
    }

    setLoader(false)
  }, [authStatus, navigate, authentication])


  return loader ? <h1>Loading...</h1> : <>{children}</>
}