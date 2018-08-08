import React from 'react';
import axios from 'axios';

import QueryForm from './components/QueryForm';
import Comment from './components/Comment';
import User from './components/User';
import Post from './components/Post';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ary: [],
      itemType: ''
    };
  }

  onSubmit(queryObject) {
    switch (queryObject.method) {
      case 'get': {
        axios
          .get(queryObject.apiurl)
          .then(response => {
            // Grab the item type so we can tell our render which component to use.
            let splitRequest = queryObject.apiurl.split('/');
            console.log(splitRequest);

            let itemType = splitRequest[splitRequest.length - 1];
            console.log(itemType);

            this.setState({ itemType: itemType });

            // Get items
            let itemsRetrieved;

            // If 'all' was not selected, just grab the amount of items the user selected
            if (queryObject.numItems) {
              itemsRetrieved = response.data.slice(
                0,
                Number(queryObject.numItems)
              );
            } else {
              // Otherwise, get the entire array.
              itemsRetrieved = response.data;
            }

            this.setState({
              ary: itemsRetrieved
            });
          })
          .catch(err => console.log(err));
      }
      case 'post': {
        //axios.post
      }
      default: {
        // console.log("No input");
      }
    }
  }

  // Class components need a render with a return statement.
  render() {
    console.log(this.state);

    let outputAry = [];

    switch (this.state.itemType) {
      case 'posts': {
        // Map to post component
        outputAry = this.state.ary.map((item, index) => (
          <Post key={'outputID-' + index} title={item.title} body={item.body} />
        ));
        break;
      }
      case 'comments': {
        outputAry = this.state.ary.map((item, index) => (
          <Comment
            key={'outputID-' + index}
            name={item.name}
            email={item.email}
            body={item.body}
          />
        ));
        break;
      }
      case 'users': {
        outputAry = this.state.ary.map((item, index) => (
          <User
            key={'outputID-' + index}
            name={item.name}
            username={item.username}
            email={item.email}
            address={item.address}
          />
        ));
        break;
      }
      default: {
        // If there is no valid itemType, display nothing
        outputAry = null;
      }
    }

    return (
      <div>
        <QueryForm numItems="10" onSubmit={this.onSubmit.bind(this)} />
        <div>{outputAry}</div>
      </div>
    );
  }
}
