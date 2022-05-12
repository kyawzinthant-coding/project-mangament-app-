import { useEffect, useState } from "react"
import { projectAuth, projectFireStore } from "../firebase/config"
import { UseAuthContext } from "./useAuthContext"


export const UselogOut = () => {

    const [ error , setError ] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [ isCancelled , setIsCancelled] = useState(false)
    const { dispatch  , user } = UseAuthContext();


    const Logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            //logging user out

            await projectAuth.signOut();


            // updating user online

            const { uid } = user;
            await projectFireStore.collection("users").doc(uid).update({online: false})

            //dispatch user out
            dispatch({type : 'LOGOUT' })

            if(!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return { Logout , isPending}
}