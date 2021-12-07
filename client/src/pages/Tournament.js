import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TOURN } from '../utils/queries';

export default function Tournament() {
  const { loading, error, data } = useQuery(QUERY_TOURN);
  if (loading) return 'Loading...';

    return (
    <div
    style={{
        backgroundColor: 'white'
    }}>
      <h1>Tournaments</h1>
      <p>
        User's Tournaments: {data}
      </p>
    </div>
  );
}