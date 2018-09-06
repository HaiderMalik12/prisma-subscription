import React from 'react';
const MessageItem = ({ message }) => (
  //   <li style={{ borderTop: '1px solid lightgray' }}>
  //     <p>
  //       {message.author || 'Anonymous'}: {message.text} (
  //       {new Date(message.createdAt).toLocaleString()})
  //     </p>
  //   </li>

  <div className="card" style={{ marginTop: '20px' }}>
    <div className="card-body">
      <p>
        {message.author || 'Anonymous'}: {message.text} (
        {new Date(message.createdAt).toLocaleString()})
      </p>
    </div>
  </div>
);
export default MessageItem;
