 import { useState, useEffect } from 'react'
import { projectAuth, projectFireStore } from '../firebase/config'
import { UseAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch  } = UseAuthContext()
//   console.log(isCancelled);

//   console.log("Hello world");

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login

      const res = await projectAuth.signInWithEmailAndPassword(email, password)
     
            await projectFireStore.collection('users').doc(res.user.uid).update({online : true})

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }

}   
    
    
    
    
    
    