import React from 'react';

const Message = ({ name, text, date }) => {
  const currentDate = new Date(date);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const formatDate = currentDate.toLocaleString('en-US', options);

  return (
    <div>
      <span>{formatDate}</span>
      <span>{name} </span> 
      <span>{text}</span>
    </div>
  )
}

export default Message;