import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ALL_MESSAGES_QUERY } from './MessageList';

const CREATE_MESSAGE = gql`
  mutation createMessage($text: String!, $author: String!) {
    createMessage(text: $text, author: $author) {
      id
    }
  }
`;

const NewMessageForm = () => (
  <Mutation
    mutation={CREATE_MESSAGE}
    update={(cache, { createMessage }) => {
      const data = cache.readQuery({
        query: ALL_MESSAGES_QUERY,
        variables: {
          first: 20,
          orderBy: 'createdAt_DESC'
        }
      });
      data.allMessages.unshift(createMessage);
      cache.writeQuery({
        query: ALL_MESSAGES_QUERY,
        data,
        variables: {
          first: 20,
          orderBy: 'createdAt_DESC'
        }
      });
    }}
  >
    {createMessage => {
      const onSubmit = event => {
        event.preventDefault();
        const text = event.target.text.value;
        if (!text) return;
        const author = event.target.author.value;
        createMessage({ variables: { text, author } });
        event.target.text.value = '';
      };
      return (
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="text"
              />
            </div>
            <div className="col-6">
              <input
                name="author"
                type="text"
                className="form-control"
                placeholder="Enter your message"
              />
            </div>
            <div class="col-2">
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </form>
      );
    }}
  </Mutation>
);

export default NewMessageForm;
