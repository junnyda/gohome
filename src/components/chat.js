import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar  from './infoBar'
import { useLocation } from 'react-router-dom';
import Messages  from './Messages/Messages'
import Input from './input'
import TextContainer from './TextContainer'




let socket

const Chat = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const location = useLocation();

  const ENDPOINT = 'http://localhost:5000'
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setRoom(room)
    setName(name)

    socket.emit('join', { name, room }, (error) => {
  
    })
    return ()=>{
      socket.disconnect();
    }
  }, [ENDPOINT, location.search])
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on('users', (users) => {
      setUsers(users)
    })
  }, []); 

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
     
    }
  }
  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);
 

  console.log(`Sent message: ${message}`);
  console.log(message, messages);


  return (
    <div className='outerContainer'>
      <div className='container'>
        
        <InfoBar room={room} name={name}/>
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat