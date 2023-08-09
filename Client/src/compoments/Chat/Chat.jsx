import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("https://friends-for-rescue-soccet.onrender.com");

function Chat() {
  const [name, setName] = useState(localStorage.getItem("username"));
  const [nameselected, setNameSelected] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) =>{
      setMessages([
         { info: data, num: localStorage.getItem("usernum"),time:new Date() },
         ...messages,
      ])}
    );
    console.log(messages);
    setMessages((prev)=>prev.sort((b,a)=>a.time-b.time))
  }, [socket, messages]);

  useEffect(() => {
    socket.on("usersConnected", (data) => {
      console.log(data);
      setUsers([...users, data]);
    });
  }, [socket, users]);
  useEffect(() => {
    if (!JSON.parse(localStorage?.getItem("myMessages"))) {
      localStorage?.setItem("myMessages", JSON.stringify([]))
    }
    
  }, []);

  useEffect(() => {
    socket.on("userDisconnected", (data) => {
      setUsers(
        users.filter((user) => {
          return user != data;
        })
      );
    });
  });
  function handleSendallMessages(){
    const saved=JSON.parse(localStorage.getItem("myMessages"))
    console.log(saved)
    saved.map((item)=>
    socket.emit("message", {
      text: item.text,
      name: localStorage.getItem("username"),
      date:item.date,
      id: `${item.socketID}${Math.random()}`,
      socketID: item.socketID,
      updatedlater:item.date
    })
    )
    localStorage?.setItem("myMessages", JSON.stringify([]))
    

  }
  const handleSendMessage = (e) => {
    e.preventDefault();
    const time=new Date()
    if (message.trim() && localStorage.getItem("username")) {
      console.log("hi");
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("username"),
        date:time,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      const allmymessage =JSON.parse(localStorage?.getItem("myMessages"))
      
      console.log(allmymessage);
      localStorage?.setItem("myMessages", JSON.stringify([
        ...allmymessage,
        {
        text: message,
        name: localStorage.getItem("username"),
        date:`${time}`,
        socketID: socket.id
      }]));
      console.log(localStorage?.getItem("myMessages"));
    }
  };
  return (
    <>
      <div id="chat-container">
        <h2 >write a message</h2>
        <div id="secondery-chat-container">
          <input
            id="message-input-container"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message"
          />
          <button id="send-message-btn" onClick={(e) => handleSendMessage(e)}>
            send
          </button>
          <button id="send--wifi-message-btn" onClick={() => handleSendallMessages()}>
            i have wifi update all
          </button>
        </div>
        <div>
          <h2 className="header-chat">Messages:</h2>
          {messages.map((messageone, index) => {
            return (
              <div key={index}>
                <a target="_blank" href={`https://wa.me/+972${messageone?.num}`}>
                  <h3 className="comment-name-sent">{messageone?.info?.name}</h3>
                </a>
                <h4 className="comment">{messageone?.info?.text}</h4>
                <p className="comment">{`${messageone?.time}`}</p>
                <p className="comment">{messageone?.info?.updatedlater}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Chat;
