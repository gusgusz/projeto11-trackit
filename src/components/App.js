import Beggin from "./Beggin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Habits from "./Habits";
import Today from "./Today";

 export const UserContext = createContext();

export default function App(){

  const [user, setUser] = useState({})
    return(
        <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
        <Routes>
          
          <Route exact path="/" element={<Beggin />}/>
          <Route path="/habits" element={<Habits />}/>
          <Route path="/today" element={<Today />}/>
          
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    )
}