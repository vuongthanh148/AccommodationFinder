import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HouseInfo = (props) => {
  const { icon, content, title } = props
  return (
    <div className="home-details-address">
      <FontAwesomeIcon style={{ color: '#bf7c2f' }} icon={icon} />
      <p
        style={{
          paddingRight: '5px',
          paddingLeft: '7px',
          textAlign: 'left',
          margin: '0',
          fontWeight: '600',
          fontSize: '1rem',
        }}
      >
        {title}:
      </p>
      <p style={{ textAlign: 'left', width: '66%', margin: 0, fontSize: '1rem' }}>{content}</p>
    </div>
  )
}

export default React.memo(HouseInfo)
