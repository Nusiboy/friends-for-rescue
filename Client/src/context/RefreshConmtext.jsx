import { createContext,useState } from "react";
export const Contextt=createContext({})
function RefreshContext ({children}){
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("LoginName"))
  const [refresh, setRefresh] = useState(false)
  return(
<Contextt.Provider value={{currentUser, setCurrentUser,refresh, setRefresh}}>
    {children}
</Contextt.Provider>
  )
}
export default RefreshContext