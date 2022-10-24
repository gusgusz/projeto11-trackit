import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { UserContext } from "./App"
import axios from "axios"

import Footer from "./Footer";
import NavBar from "./NavBar";



export default function Today(){
    const date = new Date
    const {user} = useContext(UserContext)
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
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
            console.log(response.data)
        })
    
        promise.catch(err => err.response)
    },[])


    return(
        <>
        <NavBar/>
        <Content>
            <h1>Segunda, {date.getDate()}</h1>
            <h2>67% dos hábitos concluídos</h2>
          { habits.map((obj) => <Box>
                <div>
                <span>{obj.name}</span>
                <h4>Sequência atual: {obj.currentSequence} dias</h4>
                <h4>Seu recorde: {obj.highestSequence} dias</h4>
                </div>
                <ion-icon name="checkmark-outline"></ion-icon>
            </Box>)}
        </Content>
        <Footer/>
        </>
    )
}

const Content = styled.div`
position: absolute;
top: 70px;
margin-bottom: 150px;
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
        background-color: #8FC549;
        color: #ffffff;
        height: 69px;
        width: 69px;
        border-radius: 5px;
        margin-right: 8px;

    }
`