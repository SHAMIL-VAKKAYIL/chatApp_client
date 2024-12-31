import './App.css'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import Popup from './component/Popup'

// no dotenv
const socket = io.connect(import.meta.env.VITE_BACKEND_URL)
const username = nanoid(5)


function App() {


  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [popup, setpopup] = useState(true)


  const sendChat = (e) => {
    setTimeout(()=>{
      setpopup(false)
    },7000)
    e.preventDefault()
    if (message.trim() === '') {
      return
    }
    socket.emit('chat', { message, username })
    setMessage('')
    console.log(message, 'gbj');

  }
  
  
  
  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload])
    })
  })
  
  return (
    <div className='App'>
      <div className='app_header'>
        <div className={`popup_container ${popup?'visible':'hidden'}`}>
          <Popup />
        </div>
        <h1>AnonyTalk</h1>
        <div className='chat_display'>
          {chat.map((payload, index) => {
            return (
              <p key={index}><span className='user'>{payload.username}</span> <span className='msg'>{payload.message}</span></p>
            )
          })}
        </div><br />
        <form action="" onSubmit={sendChat}>
          <input type="text" name='chat'
            placeholder='Write here...'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default App
