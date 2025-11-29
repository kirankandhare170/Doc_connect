
import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [ user , setUser] = useState("")
  
  
  
  // now create token adn setTokenwith servertoken and then  add in to local host 
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("token", serverToken);
  }




  // finally att log out setToken become empty and no token her and remove also from local
  const isLogIn = token
  //console.log(token)
  //console.log(isLogIn)
  const LogoutUser = () => {
    setToken("")
    return localStorage.removeItem("token")

  }



 // cureenlly login data 
/* const useAuthentication = async () => {
    try {
       
       const responce = await fetch("http://localhost:3000/api/v1/user/user",{
        method : "GET", 
        headers :{
           Authorization: `Bearer ${token}`,
        },
       
      });
      
        const data = await responce.json();
        console.log(data.userdata)
        setUser(data.userdata)
     
    } catch (error) {
      console.log("error from contact auth ")
    }
 }*/
  /*const getAdminData = async() => {
      try {
         const res = await fetch("http://localhost:3000/api/v1/admin/users",{
          method: "GET",
         eaders : {
            Authorization : `Bearer ${token}`
          }  
        })
         const data =  await res.json()
         setAdmin(data.users)

      } catch (error) {
        console.log('user not autherized')
      }
  } */
//  useEffect(()=>{
  //  useAuthentication()
    
//  },[])

//// this is for the this for get

   


  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser , isLogIn, user  }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};