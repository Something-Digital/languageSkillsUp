import './AuthForm.css';
import React from 'react';

import client from '../../client';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    await client.user.create({ username: this.state.username });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username
          <input type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        {/* <label>
          Password
          <input type="password" value={this.state.password} onChange={this.handleChange} />
        </label> */}
        <input type="submit" value="Login" />
      </form>
    );
  }
}
