import { useEffect,useState } from 'react'
import socketIO from "socket.io-client"

// const socket =socketIO.connect("http://localhost:4000/")

function Chat() {
    const [name,setName]=useState(localStorage.getItem("LoginName"))
    const [nameselected,setNameSelected]=useState(false)
    const [message,setMessage]=useState("")
    const [messages,setMessages]=useState([])
    const [users,setUsers]=useState([])

    useEffect(()=>{
        socket.on("messageResponse",(data)=>setMessages([...messages,{info:data,num:localStorage.getItem("usernum")}]))
    },[socket,messages])

    useEffect(()=>{
        socket.on("usersConnected",(data)=>{
            console.log(data);
            setUsers([...users,data])
        })
    },[socket,users])

    useEffect(()=>{
        socket.on("userDisconnected",(data)=>{
            setUsers(
                users.filter((user)=>{
                    return user !=data
                })
            )
        })
    })

    
    const handleSendMessage=(e)=>{
        e.preventDefault()
        if(message.trim() && localStorage.getItem("LoginName")){
            socket.emit("message",{
                text:message,
                name:localStorage.getItem("LoginName"),
                id:`${socket.id}${Math.random()}`,
                socketID:socket.id
            })
        }
    }
  return (
    <>
    <div id='chat-container'>
        {/* <h1>welcome to the socket.io chat</h1>
        <div>
            <h1>what is your name</h1>
            <input type="text"
            onChange={(e)=>setName(e.target.value)}
            placeholder='name' 
            />
            <button
            id={nameselected ? "pressed":""}
            onClick={()=>{
                localStorage.setItem("name",name)
                setNameSelected(!nameselected)
            }}
            >apply</button>
        </div> */}
        <div id='secondery-chat-container'>
            <h1>write a message</h1>
            <input id='message-input-container'
             type="text"
             onChange={(e)=>setMessage(e.target.value)}
             placeholder='message'
             />
             <button id='send-message-btn' onClick={(e)=>handleSendMessage(e)}>send</button>
        </div>
        <div>
            <h1>Messages:</h1>
            {messages.map((message,index)=>{
                return(
                    <div key={index}>
                        <a  target="_blank" href={`https://wa.me/+972${message?.num}`}><h2>{message?.info?.name}</h2></a>
                        <h3>{message?.info?.text}</h3>
                    </div>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default Chat