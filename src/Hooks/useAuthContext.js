import { useContext } from "react"
import { AuthContext } from "../content/AuthContext"

export const UseAuthContext = () => {
    const context = useContext(AuthContext)

    if ( !context) {
        throw Error('useAuthContext must be inside useAuthContextProvider')
    }
    return context;
} 