import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext(null)



export default function AuthContextProvider ({children}){

    const [user, setUser] = useState(null)


    return(<AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider> )

}

export const useAuth = ()=>useContext(AuthContext)