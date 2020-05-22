import React, {useState} from 'react'
import axios from 'axios'

const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = useState()
    const [userName, setUserName] = useState()

    const onEnter = async () => {
        const obj = {
            roomId,
            userName
        }

        if(!roomId || !userName)
            return alert('You should fill all the fields.')

        const {data:isValid} = await axios.post('/checkVal', obj)
        console.log('isValid ',isValid)
        if(isValid){
            await axios.post('/rooms', obj)
            onLogin(obj)
        } else {
            alert(`${userName} is already taken at ${roomId}`)
        }
        
    }

    return (
        <div className="join-block">
            <input type="text" placeholder="Room ID" 
                defaultValue={roomId} 
                onChange={e=> setRoomId(e.target.value)}/>
            <input type="text" placeholder="User name" 
                defaultValue={userName}
                onChange={e=> setUserName(e.target.value)}
                />
            <button className="btn btn-success"
                onClick={onEnter}>Войти</button>
        </div>
    )
}

export  default JoinBlock