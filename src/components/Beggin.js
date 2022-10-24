import { useState, useContext } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"
import {UserContext} from "./App"
import styled from "styled-components"
import Logo1 from "../assets/img/logo1.png"





export default function Beggin(){

    
    const {setUser} = useContext(UserContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [register, setRegister] = useState(true)
    const [registerData, setRegisterData] = useState(
        {
        email: "",
        name: "",
        image: "",
        password: ""
    });

    const [login, setLogin] = useState(
        {
        email: "",
        password: ""
    });

    


    function ToRegister(event) {
        event.preventDefault();
    
      
          const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`;
          const promise = axios.post(URL, registerData);
    
          promise.then(() => {
    
            setRegister(true)
            
          })
    
          promise.catch(err => alert(err.response.data.message))
        
        
      }


    function Login(event) {

        event.preventDefault();
   
       
          const URLLogin = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`;
          const promise = axios.post(URLLogin, login);
    
          promise.then(response => {
    
            setUser(response.data)
            
           
            navigate("/habits");
          });
          
          promise.catch(err => alert(err.response.data.message));
        
      }
   

    return(
        <>
       <UserContext.Provider value={user} >
        <Be>
            
            <img src={Logo1} alt="Logo Track It"/>

            { register ? 

          <form onSubmit={Login}>

         <div>
             

              <label htmlFor="email"></label>
              <input 
                type="email"
                id="email"
                value={login.email}
                placeholder="email"
                required
                onChange={e => setLogin({ ...login, email: e.target.value })}/>

              <label htmlFor="senha"></label>
              <input 
               type="password"
               id="senha"
               value={login.password}
               placeholder="senha"
               required
               onChange={e => setLogin({ ...login, password: e.target.value })}/>
                
              <button>Entrar</button>
                
              <span onClick={() => setRegister(false)}>Não tem uma conta? Cadastre-se!</span>
              
            
          </div>
          </form>
           : <form onSubmit={ToRegister}>
             <div>
            
             <label htmlFor="email"></label>
             <input 
              type="email"
              id="email"
              value={registerData.email}
              placeholder="email"
              required
              onChange={e => setRegisterData({ ...registerData, email: e.target.value })}/>
             <label htmlFor="senha"></label>
             <input 
              type="password"
              id="senha"
              value={registerData.password}
              placeholder="senha"
              required
              onChange={e => setRegisterData({ ...registerData, password: e.target.value })}/>
             <label htmlFor="nome"></label>
             <input 
              type="text"
              id="nome"
              value={registerData.name}
              placeholder="nome"
              required
              onChange={e => setRegisterData({ ...registerData, name: e.target.value })}/>
             <label htmlFor="foto"></label>
             <input 
              type="foto"
              id="url"
              value={registerData.image}
              placeholder="foto"
              required
              onChange={e => setRegisterData({ ...registerData, image: e.target.value })}/>
             <button>Cadastrar</button>
             <span onClick={() => setRegister(true)}>Já tem uma conta? Faça login!</span>
         
         </div>
         </form>
          }
          
        </Be>
        </UserContext.Provider>
        </>
    )
}

const Be = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

img{
    height: 178px;
    width: 180px;
    margin-top: 40px;
    margin-bottom: 24px;
}
div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 303px;
    margin: 20px;

    input{
        margin-bottom: 5px;
        height: 45px;
        width: 303px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;
        color: grey;
        background-color: #FFFFFF;
        font-family: Lexend Deca;
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        text-align: left;


    }
    button{
        height: 45px;
        width: 303px;
        left: 36px;
        top: 381px;
        border-radius: 4.64px;
        background-color: #52B6FF;
        border: 1px solid #52B6FF;
        font-family: Lexend Deca;
        font-size: 21px;
        font-weight: 400;
        line-height: 26px;
        color: #FFFFFF;
        cursor: pointer;


    }
    span{
        font-family: Lexend Deca;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        text-align: center;
        color: #52B6FF;
        text-decoration: underline;
        margin-top: 6px;
        cursor: pointer;

    }

}
`
