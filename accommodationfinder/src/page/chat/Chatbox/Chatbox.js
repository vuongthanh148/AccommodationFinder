import React, { useState, useEffect } from 'react'
import ChatCard from './ChatCard'
import Messages from './Massages/Messages'
import './Chatbox.css'
import Input from './Input/Input'
import axios from 'axios'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import InfoBar from '../Chatbox/InfoBar/InfoBar'

let socket

function Chatbox(props) {
  const [message, setMessage] = useState('')
  const [messagesList, setMessagesList] = useState([])
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [chatboxList, setChatboxList] = useState([])
  const [chatboxId, setChatboxId] = useState('')
  const [room, setRoom] = useState('')
  const [avatar, setAvatar] = useState('')

//   const type = 'admin'
  const type = props.role.toLowerCase();
  // console.log(type);
  // console.log(props.userId);
  // console.log(props.userName);
  // console.log(props.userAvatar);
  // console.log(props.role.toUpperCase());

  const ENDPOINT = 'localhost:3002'

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket', 'polling', 'flashsocket'],
    })
    if (type === 'owner') {
      axios
        .get(`http://localhost:3002/${props.userId}`, {
          body: {
            _id: props.userId,
            name: props.userName,
            avatar: props.userAvatar,
            role: props.role.toUpperCase(),
          },
        })
        .then((result) => {
          const { chatboxes } = result.data
          console.log(chatboxes)
          setChatboxList(chatboxes)
          setName(props.userName)
          setUserId(props.userId)
          setRoom('ADMIN')
          setAvatar('https://i.imgur.com/fTZerDj.png')
          setChatboxId(chatboxes[0]._id)
        })
        .catch((error) => console.log(error))
    } else if (type === 'admin') {
      axios
        .get(`http://localhost:3002/`, {})
        .then((result) => {
          const { chatboxes } = result.data
          console.log({ chatboxes })
          setChatboxList(chatboxes)
          setName('')
          setRoom(chatboxes[0].ownerName)
          setAvatar(chatboxes[0].ownerAvatar)
          setChatboxId(chatboxes[0]._id)
        })
        .catch((error) => console.log(error))
    }

    return () => {
      // socket.emit('disconnect');
      socket.off()
    }
  }, [ENDPOINT])

  useEffect(() => {
    socket.on('message', (messageSent) => {
      setMessagesList((messages) => [...messages, messageSent])
    })
  }, [])

  useEffect(() => {
    if (chatboxId !== '') {
      socket.emit('join', { name, chatboxId }, () => {})
      axios
        .get('http://localhost:3002/getChatbox/' + chatboxId)
        .then((result) => {
          setMessagesList(result.data.messages)
        })
        .catch((error) => console.log(error))
    }
  }, [chatboxId])

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit(
        'sendMessage',
        {
          content: message,
          senderId: userId,
          chatboxId: chatboxId,
          senderName: name,
        },
        () => setMessage('')
      )
    }
  }

  return (
    <div className="">
      <div className="chatScreen">
        <div className="listChatbox row">
          <div className="chatBoxCardList d-inline col-md-9">
            <div className="searchBar">
              <input
                className="searchInput"
                placeholder="Tìm kiếm"
                type="text"
              ></input>
            </div>
            <div className="list">
              {chatboxList.map((item, index) => (
                <div
                  className="chat_list"
                  onClick={() => {
                    setChatboxId(item._id)
                    if (type === 'admin') {
                      setAvatar(item.ownerAvatar)
                      setRoom(item.ownerName)
                    }
                  }}
                  key={'chat_card_' + index}
                >
                  <ChatCard info={item} userId={userId} key={index} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox col-md-3">
            <InfoBar room={room} avatar={avatar} />
            <Messages messages={messagesList} userId={userId} name={name} />
            <Input
              message={message}
              messages={messagesList}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbox
