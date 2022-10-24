import styled from "styled-components"
import { useContext } from "react"
import { UserContext } from "./App"

export default function NavBar(){

    const {user} = useContext(UserContext);

    return(
        <Nav>
            <h1>TrackIt</h1>
            <img alt="profile" src={user.image}></img>
        </Nav>
    )
}

const Nav = styled.div`
 display: flex;
 background-color: #126BA5;
 position: absolute;
 justify-content: space-between;
 align-items: center;
 width: 100%;
 height: 70px;
 top: 0;
 left: 0;
 right: 0;
 



h1{
    font-family: Playball;
    font-size: 39px;
    font-weight: 400;
    line-height: 49px;
    text-align: left;
    left: 20px;
    color: #ffffff;
    position: relative

}
img{
    height: 51px;
    width: 51px;
    border-radius: 98.5px;
    right: 20px;
    position: relative;

}
`