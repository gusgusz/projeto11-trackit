import styled from "styled-components"
import { Link } from "react-router-dom"
import Hoje from "../assets/img/hoje.png"


export default function Footer(){


    return(
        <Buttons>
            <Link to="/habits">
            <h1>Hábitos</h1>
            </Link>
            <Link to="/today">
            <img  alt="today"  src={Hoje}></img>
            </Link>
            <Link to="/history">
            <h1>Histórico</h1>
            </Link>
        </Buttons>
    )
}

const Buttons = styled.div`
display: flex;
justify-content: space-between;
height: 70px;
width: 100%;
position: fixed;
bottom: 0;
background-color: #ffffff;
align-items: center;
padding: 0 20px;



    h1{
        font-family: Lexend Deca;
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        color: #52B6FF;
        cursor: pointer;
        text-decoration: none;
        cursor: pointer;


    }
    

    img{
        border-radius: 50px;
        align-self: center;
        padding-bottom: 40px;
        cursor: pointer;
        cursor: pointer;
    }




`
