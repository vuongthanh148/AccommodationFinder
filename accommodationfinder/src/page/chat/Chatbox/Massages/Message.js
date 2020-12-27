import React from 'react';

import './message.css';

import ReactEmoji from 'react-emoji';
import Avatar from 'react-avatar';

function Message({ message, userId }) {
    const { content, senderId, senderName } = message;
    let isSentByCurrentUser = false;

    if (userId === senderId) {
        isSentByCurrentUser = true;
    }

    return isSentByCurrentUser ? (
        <div className='messageContainer justifyEnd'>
            <p className='sentText pr-10'>{senderName}</p>
            <div className='messageBox'>
                <p className='messageText colorWhite'>
                    {ReactEmoji.emojify(content)}
                </p>
            </div>
        </div>
    ) : (
        <div className='messageContainer justifyStart'>
            <div className='messageBox backgroundLight'>
                <p className='messageText colorDark'>
                    {ReactEmoji.emojify(content)}
                </p>
            </div>
            <p className='sentText pl-10 '>{senderName}</p>
        </div>
    );
}

export default Message;
