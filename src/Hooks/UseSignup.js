
import { useEffect, useState } from "react";
import { projectAuth, projectFireStore, projectStorage } from "../firebase/config";
import { UseAuthContext } from "./useAuthContext";


export const UseSignUp = () => {


    const [ error , setError ] = useState(null)
    const [ isPending , setIspending] = useState(false)    
    const [isCancelled , setIsCancelled] = useState(false)
    const { dispatch } = UseAuthContext();

    console.log(isCancelled);
    
    const SignUp = async (email , password , displayName , profile) => {
        setError(null)
        setIspending(true)

        try{
            const res = await projectAuth.createUserWithEmailAndPassword(email , password)

            if (!res){
                throw Error("Could not Create New User")
            }
            
            //update profile path 

            const uploadedPath = `profile/${res.user.uid}/${profile.name}`
            const img = await projectStorage.ref(uploadedPath).put(profile)
            const imgURL = await img.ref.getDownloadURL();

            //update display name to user

            await res.user.updateProfile({displayName , photoURL : imgURL})

            //create use document
            await projectFireStore.collection('users').doc(res.user.uid).set({
                online : true,
                displayName,
                photoURL : imgURL
            })


            //dispath signup action
            dispatch({type : 'LOGIN' , payload : res.user })

            if (!isCancelled) {
                setIspending(false)
                setError(null)
            }

        }catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIspending(false)
            }
        }
    } 


  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])




    return { SignUp , error , isPending}
}