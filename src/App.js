import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  query users(
    $first: Int!
    $where: UserWhereInput
  ){
    objectsConnection: usersConnection (
      first: $first
      where: $where
    ){
      aggregate{
        count
      }
      edges{
        node{
          ...user
        }
      }
    }
  }

  fragment user on User {
    id
    username
    EthAccounts{
      id
      type
      address
      balance
    }
  }
`;

// console.log("query", query);

class TestApp extends Component {

  static propTypes = {

  };

  render() {

    const {
      data: {
        objectsConnection,
      },
    } = this.props;

    if (!objectsConnection) {
      return null;
    }

    const objects = objectsConnection.edges.map(({ node }) => node);

    console.log("objectsConnection", objectsConnection);
    console.log("objects", objects);

    return (
      <div>
        {objects.map(n => {

          const {
            id,
          } = n;

          return <div
            key={id}
          >
            {id}
          </div>

        })}
      </div>
    );
  }
}

export default graphql(query, {
  options: {
    variables: {
      first: 10,
      where: {
        "EthAccounts_some": {
          "id_not": null
        }
      },
    },
  },
})(TestApp);