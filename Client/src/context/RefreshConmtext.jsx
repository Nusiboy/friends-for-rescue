import { createContext, useState } from "react";
export const RefContext=createContext({})
function RefreshContext ({children}){
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("LoginName"))
  const [refresh, setRefresh] = useState(false)
  const [ref,setRef]=useState(false)
  return(
<RefContext.Provider value={{currentUser, setCurrentUser,refresh, setRefresh,ref,setRef}}>
    {children}
</RefContext.Provider>
  )
}
export default RefreshContext