import React from 'react';

import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

import './messages.css';

const Messages = ({ messages, userId, name }) => {
    return (
        <ScrollToBottom className='messages'>
            {messages.map((message, i) => (
                <div key={i}>
                    <Message message={message} userId={userId} name={name} />
                </div>
            ))}
        </ScrollToBottom>
    );
};

export default Messages;
