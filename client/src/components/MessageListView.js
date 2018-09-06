import React from 'react';
import MessageItem from './MessageItem';

const MessageListView = class extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToMore();
  }
  render() {
    const { data } = this.props;
    return (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.allMessages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>
    );
  }
};
export default MessageListView;
