import styled from "styled-components"
import Habits from "./Habits"

 export default function MyHabits(){


    return (
        <>
        <AddHabits>
            <h1>Meus hábitos</h1>
            <button>+</button>
        </AddHabits>
        <HabitsContent>     
            <span> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
        </HabitsContent>
        </>
    )
 }
 const AddHabits = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 70px;
    align-items: center;
    top: 70px;
    background-color: #e5e5e5;

    h1{
        position: absolute;
        font-family: Lexend Deca;
        font-size: 23px;
        font-weight: 400;
        line-height: 29px;
        color: #126BA5;
        left: 20px;
    }
 

    button{
    position: absolute;
    height: 35px;
    width: 40px;
    right: 24px;
    border-radius: 4.64px;
    background-color: #52B6FF;
    color: #FFFFFF;
    border: 1px solid #52B6FF;
    }
 `
const HabitsContent = styled.div`
display: flex;
align-items: center;
flex-direction: column;
 background-color: #e5e5e5;
 width: 100%;
 position: absolute;
 top: 127px;
 height: 100%;

 span{
    width: 85%;
    position: relative;
    margin: 20px 0;
    font-family: Lexend Deca;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;

    
 }
`