import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MessageItem from './MessageItem';

export const ALL_MESSAGES_QUERY = gql`
  {
    allMessages(orderBy: createdAt_DESC, first: 20) {
      id
      createdAt
      text
      author
    }
  }
`;

const MessageList = () => (
  <Query query={ALL_MESSAGES_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      return (
        <React.Fragment>
          {data.allMessages.map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </React.Fragment>
      );
    }}
  </Query>
);

export default MessageList;
