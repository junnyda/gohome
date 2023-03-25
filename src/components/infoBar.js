import React from 'react'
import onlineIcon from '../components/onlineIcon.png'
import closeIcon from '../components/closeIcon.png'
import './infoBar.css'

const InfoBar = ({ room, name}) => {

  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='online icon' />
        <h3>{name}</h3>
      </div>
      <div className='rightInnerContainer'>
        <a href={`/meeting/group/${room}`}>
          <img src={closeIcon} alt='close icon' style={{width:"10px"}}/>
        </a>
      </div>
    </div>
  )
}

export default InfoBar