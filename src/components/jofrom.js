/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './as.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from "actions/user_action";
import { useParams } from 'react-router-dom'

const Joform = () => {
const {no} = useParams();
const dispatch = useDispatch();
const [user,setuser] = useState([]);
  useEffect(() => {
    dispatch(auth()).then((response) => {
      setName(response.payload.name)
       
    });
  }, [dispatch]);

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'></h1>
   
      <div>
        <input
          placeholder='이름'
          className='joinInput'
          type='text'
          value={name}

        />
        
        </div>
        <div>
          <input
            placeholder='채팅방'
            className='joinInput mt-20'
            type='text'
            value={no}
          />
        </div>
        <Link
          onClick={(e) => (!name || !no ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${no}`}
        >
          <button className={'button mt-20'} type='submit'>
            채팅 시작{}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Joform