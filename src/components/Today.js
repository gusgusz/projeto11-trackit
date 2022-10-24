import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { UserContext } from "./App"
import axios from "axios"

import Footer from "./Footer";
import NavBar from "./NavBar";



export default function Today(){
    const date = new Date()
    const {user} = useContext(UserContext)
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
    const dayName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    const [habits,setHabits] = useState([])
    const [control, setControl] = useState(true)
    const [count, setCount] = useState(0)
    
    useEffect(() => {
            
    
        const promise = axios.get(URL, config)
        promise.then(response => {
            setHabits(response.data)
            Count(response.data)
           
            
        })
    
        promise.catch(err => err.response)
    },[control])
    
    function Count(arr){
        const done = arr.filter((o) => o.done === true)
        let i = ((done.length)/(arr.length)*100)
        setCount(i)
        
        
    }

     function CheckIt(c){
        const URLU =`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${c.id}/uncheck`
        const URLM = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${c.id}/check`
        if(!(c.done)){
            const promise = axios.post(URLM,c.id, config)
            console.log(URLM)
            promise.then(() => {
                
                setControl(!control)
                console.log("tentei marcar")
            })
            promise.catch(err => {console.log("marquei", err.response.data)})
        }
        else{
            const promise = axios.post(URLU,c.id, config)

            promise.then(() => {
                
                setControl(!control)
        
            })
            promise.catch(err => {console.log(err.response.data)})
        }
     }
    
    return(
        <>
        <NavBar/>
        <Content>
            <h1>{dayName[date.getDay()]}, {date.getDate()}/{date.getMonth() + 1}</h1>
            <h2>{count}% dos hábitos concluídos</h2>
          { habits.map((obj,i) =>
           <Box done={obj.done} key={i}> 
          
                <div>
                <span>{obj.name}</span>
                <h4>Sequência atual: {obj.currentSequence} dias</h4>
                <h4>Seu recorde: {obj.highestSequence} dias</h4>
                </div>
                <ion-icon onClick={() => CheckIt(obj)} name="checkbox"></ion-icon>
            </Box>)}
        </Content>
        <Footer/>
        </>
    )
}

const Content = styled.div`
position: absolute;
top: 70px;
margin-bottom: 100px;
padding-bottom: 100px;
background-color: #e5e5e5;
height: 100%;
    width: 100%;
    padding-left: 8%;
    

h1{
    font-family: Lexend Deca;
    font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    color: #126BA5;
    margin-top: 12px;
    
    


}
h2{
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: #8FC549;
    margin-top: 3px;
    margin-bottom: 24px;


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
        cursor: pointer;

    }
`