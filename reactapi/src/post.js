import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    firstname: '',
    lastname: '',
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      firstname: this.state.name,
      lastname: this.state.name
    };

    axios.post("http://localhost:12345/person", user)
      .then(res => {
        console.log(res);
        console.log(res.data);

      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}