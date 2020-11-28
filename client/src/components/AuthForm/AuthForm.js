import './AuthForm.css';

import React from 'react';

import TextInput from '../TextInput'

import client from '../../client';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    await client.user.create({ username: this.state.username });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          placeholder="Username"
          value={this.state.username}
          handleChange={this.handleChangeUsername}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}
