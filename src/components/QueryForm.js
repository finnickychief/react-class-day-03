import React from 'react';

export default class QueryForm extends React.Component {
  constructor(props) {
    // Call constructor of React.Component
    super(props);

    this.state = {
      method: 'get',
      apiurl: 'https://jsonplaceholder.typicode.com/users',
      numItems: ''
    };
  }

  // event handler for our controlled input components
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();
    // Build our request object for our parent to submit.

    const { method, apiurl, numItems } = this.state;
    /*
      Previous statement is the same thing as writing this:
    const method = this.state.method;
    const apiurl = this.state.apiurl;
    const numItems = this.state.numItems;
    
    */

    const requestObject = {
      method,
      apiurl,
      numItems
    };

    // const requestObject = {
    //   method: this.state.method,
    //   apiurl: this.state.apiurl,
    //   numItems: this.state.numItems
    // }

    this.props.onSubmit(requestObject);
  }

  render() {
    // Destructure current props so we don't have to change the form after our conversion
    const { props } = this;

    // Build the numItems options as an array to be output
    let numItemsOptions = [
      <option key="all" value="">
        All
      </option>
    ];
    for (let i = 1; i <= props.numItems; i++) {
      numItemsOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    // Must return exactly one item from any functional component or render method
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Method: </label>
        <select
          name="method"
          value={this.state.method}
          onChange={this.onChange.bind(this)}
        >
          <option value="get">Get</option>
          <option value="post">Post</option>
        </select>
        <br />
        <label htmlFor="apiurl">URL: </label>
        <input
          type="text"
          name="apiurl"
          id="apiurl"
          value={this.state.apiurl}
          onChange={this.onChange.bind(this)}
        />
        <br />
        <label>Number to retrieve: </label>
        <select
          name="numItems"
          value={this.state.numItems}
          onChange={this.onChange.bind(this)}
        >
          {numItemsOptions}
        </select>
        <button>Send Request</button>
      </form>
    );
  }
}
