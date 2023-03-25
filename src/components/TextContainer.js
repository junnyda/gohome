import React from 'react'

import onlineIcon from '../components/onlineIcon.png'
import './TextContainer.css'

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    <div>
      <h1>
        모임 채팅{' '}
        <span role='img' aria-label='emoji'>
          💬
        </span>
      </h1>
      <h2>
      모임원들과 소통하세요{' '}
        <span role='img' aria-label='emoji'>
          ❤️
        </span>
      </h2>
      <h2>
        Try it out right now!{' '}
        <span role='img' aria-label='emoji'>
          ⬅️
        </span>
      </h2>
    </div>
    {users ? (
      <div>
        <h1>현재 채팅중인 사람들 : </h1>
        <div className='activeContainer'>
          <h2>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name}
                <img alt='Online Icon' src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
)

export default TextContainer