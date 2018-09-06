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

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage {
    newMessage {
      mutation
      node {
        id
        createdAt
        text
        author
      }
    }
  }
`;

const MessageList = () => (
  <Query query={ALL_MESSAGES_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      subscribeToMore({
        document: NEW_MESSAGE_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const { mutation, node } = subscriptionData.data.newMessage;
          if (mutation !== 'CREATED') return prev;
          return Object.assign({}, prev, {
            allMessages: [node, ...prev.allMessages].slice(0, 20)
          });
        }
      });
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
