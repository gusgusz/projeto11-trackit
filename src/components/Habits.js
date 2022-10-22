import { useContext } from "react"
import {UserContext} from "./App"
import NavBar from "./NavBar";
import MyHabits from "./MyHabits";

export default function Habits(){

    const {user} = useContext(UserContext);
    
    return (
    <>
    <NavBar/>
    <MyHabits/>
   
    </>
    )
}
