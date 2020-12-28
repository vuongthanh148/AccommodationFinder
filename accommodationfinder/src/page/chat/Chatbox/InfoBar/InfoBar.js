import React from 'react';

import './InfoBar.css';

const InfoBar = ({ room, avatar }) => {
    return(
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img src={avatar} style={{width: '40px', height: '40px'}}></img>
            <h3 style={{margin: 0}}>{room}</h3>
        </div>
        <div className='rightInnerContainer'></div>
    </div>
)};

export default InfoBar;
