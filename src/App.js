import React, {useReducer, useEffect} from 'react'
import axios from 'axios'
import JoinBlock from './components/JoinBlock'
import reducer from './reducer'
import socket from './socket'
import Chat from './components/Chat'

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isJoin: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  })

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })

    socket.emit('ROOM:JOIN', obj)
    const {data} = await axios.get(`/rooms/${obj.roomId}`)
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  }

  const setUsers = users => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }

  const addMessage = message => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  }

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers) 
    socket.on('ROOM:NEW_MESSAGE', addMessage) 
  }, [])

  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.isJoin ? <JoinBlock {...state} onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
