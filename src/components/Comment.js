import React from 'react';

export default props => {
  return (
    <div>
      <h3>{props.name}</h3>
      <h4>{props.email}</h4>
      <p>{props.body}</p>
    </div>
  );
};
