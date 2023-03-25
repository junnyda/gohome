import React, { useRef, useEffect } from 'react';
import Message from './Message/Message';
import './Messages.css';

const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages" style={{ overflowY: 'scroll', height: '400px' }}>
      {messages.length === 0 ? (
        <div>{messages === null ? null : 'No messages yet'}</div>
      ) : (
        messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;