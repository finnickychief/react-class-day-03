import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <div>He World from Parcel</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
