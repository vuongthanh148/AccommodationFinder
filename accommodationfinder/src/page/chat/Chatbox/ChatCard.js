import React from 'react';
import Avatar from 'react-avatar';

function ChatCard(props) {
    const { info, lastMessage } = props;
    const { ownerName, ownerAvatar, isReadLastMessage, lastestSenderName } = info;
    let name = ownerName;
    let avatar = ownerAvatar;
    console.log(avatar)
    
    return (
        <div className='chatCard'>
            <img src={avatar} style={{width: '40px', height: '40px'}}></img>
            <div className='d-inline'>
                <h6 className='d-inline'>{name}</h6>{' '}
                <div className='char-card-lastest'>
                    <span className='chat-card-sender-name'>
                        {lastestSenderName}
                    </span>
                    <span className='chat-card-lastest-message'>{}</span>
                </div>
            </div>
        </div>
    );
}

export default ChatCard;
