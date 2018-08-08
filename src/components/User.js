import React from 'react';

export default props => {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.username}</p>
      <p>{props.email}</p>
      <p>{`${props.address.city}, ${props.address.zipcode}`}</p>
    </div>
  );
};

// import Componentname from 'ComponentPath' <- Generic import
// import User from './components/User' <- Import to use this component
