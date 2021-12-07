import { gql } from '@apollo/client';

// written following the example from class
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_TOURN = gql`
{
  me {
    tournList
  }
}
`;