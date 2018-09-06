import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MessageItem from './components/MessageItem';
import MessageListView from './components/MessageListView';

const query = gql`
  {
    allMessages(orderBy: createdAt_DESC, first: 20) {
      id
      createdAt
      text
      author
    }
  }
`;

const subscription = gql`
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
  <Query query={query}>
    {({ loading, error, data, subscribeToMore }) => {
      debugger;
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      const more = () =>
        subscribeToMore({
          document: subscription,
          updateQuery: (prev, { subscriptionData }) => {
            debugger;
            if (!subscriptionData.data) return prev;
            const { mutation, node } = subscriptionData.data.newMessage;
            if (mutation !== 'CREATED') return prev;
            return Object.assign({}, prev, {
              allMessages: [node, ...prev.allMessages].slice(0, 20)
            });
          }
        });
      return <MessageListView data={data} subscribeToMore={more} />;
    }}
  </Query>
);

export default MessageList;
