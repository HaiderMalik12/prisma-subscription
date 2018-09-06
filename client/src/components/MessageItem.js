import React from 'react';
const MessageItem = ({ message }) => (
  <li style={{ borderTop: '1px solid lightgray' }}>
    <p>
      {message.author || 'Anonymous'}: {message.text} (
      {new Date(message.createdAt).toLocaleString()})
    </p>
  </li>
);
export default MessageItem;
