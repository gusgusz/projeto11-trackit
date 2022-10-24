import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { UserContext } from "./App"
import axios from "axios"



 export default function MyHabits(){
    // name of the new habit
    const [newHabit, setNewHabit] = useState("")
    const days = ["D", "S", "T", "Q", "Q","S","S"]
   const {user} = useContext(UserContext)
   //array that I receive from API
   const [habits,setHabits] = useState([])
   // Days that  I want to register my new habit
   const [clicked,setClicked] = useState([])
   //If new Habit is opened
   const [open,setOpen] = useState(false)
   const [control,setControl] = useState(true)
   
const config = {
	headers: {
		"Authorization": `Bearer ${user.token}`
	}
}

const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;

    useEffect(() => {
        

        const promise = axios.get(URL, config)

        promise.then(response => {
            setHabits(response.data)
           
        })

        promise.catch(err => err.response)
    },[control])
    
    if(habits === (null || undefined)){
        return(
            <h1>carregando</h1>
        )
    }
   

    function HabitRegister() {
       
        
if(newHabit !== ""&& clicked.length !== 0){

    const r =  {
        name: `${newHabit}` ,
        days: clicked ,
    }


    

     
   
       
         
          const promise = axios.post(URL, r, config);
    
          promise.then(response => {
    
            setControl(!control)
            setClicked([])
            setNewHabit("")
            setOpen(false)
            
            
            
          })
    
          promise.catch(err => {alert(err.response.data.details)
            setControl(!control)
        })
    }
    else(alert("Você precisar nomear um habito e escolher pelo menos um dia na semana"))
  
        
      }

      function DeleteHabit(i){
    
         
        const promise = axios.delete(`${URL}/${i}`, config);
  
        promise.then(response => 
            {
                console.log(response.data)
                setControl(!control)
            }
        )
        promise.catch(err =>{ console.log("erro", err.data.response)})
          
    }

    return (
        <>
        <AddHabits>
            <h1>Meus hábitos</h1>
            <button key="setOpen"onClick={() => setOpen(true)}>+</button>
        </AddHabits>
        <HabitsContent>  
        {open ?    
            <NewHabit newHabit={newHabit}>
            <label htmlFor="newHabit"></label>
                <input
                id="newHabit"
                placeholder="nome do hábito"
                required
                onChange={e => setNewHabit(e.target.value )}
                value={newHabit}
                
                />
                <Days>
                    {days.map((d,index) => clicked.includes(index) ?
                         (<button onClick={() => Click(index)} className="cliked" key={index}>{d}</button>)
                          : 
                          (<button onClick={() => Click(index)}  key={index}>{d}</button>))}
                </Days>
                <div className="buttons">
                    <button className="cancel" onClick={() => CancelNewHabit()}>Cancelar</button>
                    <button className="save" onClick={() => HabitRegister()}>Salvar</button>
                </div>
            </NewHabit>
 : ""}
            {habits.length ===  0 ? 
             <span> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
            :
            habits.map((obj, i) => 
            <Habit key={i}>
            <ion-icon onClick={() => DeleteHabit(obj.id)} name="trash-outline"></ion-icon>
            <h1>{obj.name}</h1>
          <Days>
                {days.map((d,index) => (obj.days).includes(index) ?
                     (<button  className="cliked" key={index}>{d}</button>)
                      : 
                      (<button   key={index}>{d}</button>))}
            </Days>
        </Habit>
            )
         
            }
           
        </HabitsContent>
        </>
    )


    function Click(i){
        
        if(clicked.includes(i)){
            const newC = clicked.filter(le => le !== i)
            setClicked(newC)
           
        }
        else{
           
            
            setClicked([...clicked,i])
         
        }
    }

function CancelNewHabit(){
    setClicked([])
    setNewHabit("")
    setOpen(false)
    
}

 }
 const AddHabits = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 70px;
    align-items: center;
    top: 70px;
    background-color: #e5e5e5;
    margin-bottom: 10px;

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
    font-family: Lexend Deca;
    font-size: 27px;
    font-weight: 400;
    line-height: 34px;
    align-self: center;
    cursor: pointer;

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
 margin-bottom: 170px;
 overflow: scroll;
 padding-bottom: 130px;

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


 const NewHabit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    margin: 20px 0;
    background-color: #ffffff;
    height: 180px;
    border-radius: 5px;
    border: 1px solid #ffffff;

    .buttons{
        margin-top: 40px;
        width: 90%;
        display: flex;
        justify-content: end;
        cursor: pointer;
    }

    input{

        width: 85%;
        height: 45px;
        border-radius: 5px;
        margin-top: 18px;
        font-family: Lexend Deca;
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        text-align: left;
        color: ${props => props.newHabit === "" ? "#DBDBDB" : "#666666"};
        background-color: #ffffff;
        border: 1px solid #DBDBDB;


    }

    .save{
        height: 35px;
        width: 84px;
        border-radius: 4.64px;
        background-color: #52B6FF;
        color: #ffffff;
        font-family: Lexend Deca;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        margin: 0 5px;
        border: 1px solid #52B6FF;
        cursor: pointer;

    }

    .cancel{
        height: 35px;
        width: 84px;
        border-radius: 4.64px;
        color: #52B6FF;
        align-items: center;
        background-color: #ffffff;
        border: none;
        font-family: Lexend Deca;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        cursor: pointer;
        
       

    }

  
 `

const Days = styled.div`
display: flex;
flex-wrap: nowrap;
justify-content: left;
width: 85%;
margin-top: 6px;

.cliked{
   margin-right: 5px;
   height: 30px;
   width: 30px;
   border-radius: 5px;
   font-family: Lexend Deca;
   font-size: 20px;
   font-weight: 400;
   line-height: 25px;
   background-color: #CFCFCF;
   color: #ffffff;
   border: 1px solid #DBDBDB;
   cursor: pointer;
   


}

button{
   margin-right: 5px;
   height: 30px;
   width: 30px;
   border-radius: 5px;
   font-family: Lexend Deca;
   font-size: 20px;
   font-weight: 400;
   line-height: 25px;
   background-color: #ffffff;
   color: #CFCFCF;
   border: 1px solid #DBDBDB;
   cursor: pointer;


}

`

const Habit = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 9px 0;
    background-color: #ffffff;
    height: 91px;
    border-radius: 5px;
    border: 1px solid #ffffff;
    padding-left: 20px;
    padding-bottom: 4.5px;
   

    h1{
       
        border-radius: 5px;
        margin-top: 10px;
        font-family: Lexend Deca;
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        text-align: left;
        color: #666666;
        
    }
    ion-icon{
        position: absolute;
        right: 10%;
        margin-top: 8px;
        cursor: pointer;
    }
`