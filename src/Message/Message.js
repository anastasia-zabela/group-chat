import React from 'react';

import messageStyle from './Message.module.css';

const Message = ({ name, text, date }) => {
  const currentDate = new Date(date);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const formatDate = currentDate.toLocaleString('en-US', options);

  return (
    <div className={messageStyle.messageContainer}>
      <div>
        <span className={messageStyle.name}>{name}</span>
        <span className={messageStyle.date}>{formatDate}</span>
      </div>
      <div className={messageStyle.message}>{text}</div>
    </div>
  )
}

export default Message;