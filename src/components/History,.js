import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { UserContext } from "./App"
import axios from "axios"

import Footer from "./Footer";
import NavBar from "./NavBar";



export default function History(){
    
    const {user} = useContext(UserContext)
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily"
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    const [habits,setHabits] = useState([])
    
    useEffect(() => {
            
    
        const promise = axios.get(URL, config)
    
        promise.then(response => {
            setHabits(response.data)
            
        })
    
        promise.catch(err => err.response)
    },[])

    if(habits === null){return <h1>carregando...</h1>}


    return(
        <>
        <NavBar/>
       {((habits.length) !== 0) 
       ?   <Content>
       <h1><strong>Histórico</strong></h1>
       {habits.map((obj,index) =>{ return(
           <div key={index}>
       <h1>{obj.day}</h1>
       {obj.habits.map((o,i) => {return(
               <Box done={o.done} key={i}>
               <div>
               <span>{o.name}</span>
             
               </div>
               <ion-icon name="checkbox"></ion-icon>
           </Box>
       )})}
 
       </div>
       )})}
   </Content> : 
       
       <Content>
        <h1><strong>Histórico</strong></h1>
        <span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
       </Content>
       }
      
        
        <Footer/>
        </>
    )
}

const Content = styled.div`
position: absolute;
top: 70px;
background-color: #e5e5e5;
height: 100%;
    width: 100%;
    padding-left: 8%;
    overflow: scroll;
    margin-bottom: 100px;
padding-bottom: 100px;
    
    

h1{
    font-family: Lexend Deca;
    font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    color: #126BA5;
    margin-top: 12px;
    margin-bottom: 9px;
    
    


}
span{
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: black;
    margin-top: 32px;
    margin-bottom: 9px;
    
    


}
div{
    overflow: scroll;
    
}


`

const Box = styled.div`
display: flex;
background-color: #ffffff;
width: 89%;
height: 94px;
justify-content: space-between;
align-items: center;
margin-bottom: 13px;
border-radius: 5px;
div{
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    margin-right: 12px;
    span{
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400; 
    line-height: 25px;
    margin-bottom: 6px;


    }

    h4{
        font-family: Lexend Deca;
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;


    }
}


ion-icon{
        background-color: white;
        color: ${props => props.done ? "#8FC549" : "#E7E7E7" };
        height: 69px;
        width: 69px;
        border-radius: 5px;
        margin-right: 8px;

    }
`