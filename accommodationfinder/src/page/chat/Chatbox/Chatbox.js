import React, { useState, useEffect } from 'react';
import ChatCard from './ChatCard';
import Messages from './Massages/Messages';
import './Chatbox.css';
import Input from './Input/Input';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import InfoBar from '../Chatbox/InfoBar/InfoBar';

let socket;

function Chatbox(props) {
    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [chatboxList, setChatboxList] = useState([]);
    const [chatboxId, setChatboxId] = useState('');
    const [room, setRoom] = useState('');

    const type = props.role.toLowerCase();
    console.log(type);
    console.log(props.userId);
    console.log(props.userName);
    console.log(props.role.toUpperCase());

    const ENDPOINT = 'localhost:3002';

    useEffect(() => {
        socket = io(ENDPOINT, {
            transports: ['websocket', 'polling', 'flashsocket'],
        });
        if (type === 'owner') {
            console.log('dit me may');
            axios
                .get(`http://localhost:3002/${props.userId}`, {
                    body: {
                        _id: props.userId,
                        name: props.userName,
                        role: props.role.toUpperCase(),
                    },
                })
                .then((result) => {
                    const { chatboxes } = result.data;
                    console.log(chatboxes);
                    setChatboxList(chatboxes);
                    setName(props.userName);
                    setUserId(props.userId);
                    setChatboxId(chatboxes[0]._id);
                })
                .catch((error) => console.log(error));
        } else if (type === 'admin') {
            axios
                .get(`http://localhost:3002/`, {})
                .then((result) => {
                    const { chatboxes } = result.data;
                    console.log({ chatboxes });
                    setChatboxList(chatboxes);
                    setName('ADMIN');
                    setUserId('');
                    setChatboxId(chatboxes[0]._id);
                })
                .catch((error) => console.log(error));
        }

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', (messageSent) => {
            setMessagesList((messages) => [...messages, messageSent]);
        });
    }, []);

    useEffect(() => {
        if (chatboxId !== '') {
            socket.emit('join', { name, chatboxId }, () => {});
            axios
                .get('http://localhost:3002/getChatbox/' + chatboxId)
                .then((result) => {
                    setMessagesList(result.data.messages);
                })
                .catch((error) => console.log(error));
        }
    }, [chatboxId]);

    const sendMessage = (event) => {
        event.preventDefault();
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
            );
        }
    };

    return (
        <div className=''>
            <div className='chatScreen'>
                <div className='listChatbox row'>
                    <div className='chatBox col-md-3'>
                        <InfoBar room={room} />
                        <Messages
                            messages={messagesList}
                            userId={userId}
                            name={name}
                        />
                        <Input
                            message={message}
                            messages={messagesList}
                            setMessage={setMessage}
                            sendMessage={sendMessage}
                        />
                    </div>
                    <div className='chatBoxCardList d-inline col-md-9'>
                        <div className='list'>
                            {chatboxList.map((item, index) => (
                                <div 
                                    onClick={() => {
                                        setChatboxId(item._id);
                                        if (type === 'ADMIN') {
                                            setRoom(item.ownerName);
                                        }
                                    }}
                                    key={'chat_card_' + index}>
                                    <ChatCard
                                        info={item}
                                        userId={userId}
                                        key={index}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbox;
