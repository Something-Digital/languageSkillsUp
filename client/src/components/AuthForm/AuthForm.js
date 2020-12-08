import './AuthForm.css';
import React from 'react';
import TextInput from '../TextInput'
import client from '../../client';
import { Link } from 'react-router-dom';

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
          placeholder="USERNAME"
          value={this.state.username}
          handleChange={this.handleChangeUsername}
        />
        <TextInput
          placeholder="PASSWORD"
          value={this.state.username}
          handleChange={this.handleChangeUsername}
        />
        <input type="submit" value={ this.props.type === 'login' ? 'LOG IN' : 'REGISTER' } />
        <Link to={ this.props.type === 'login' ? '/register' : '/login' }>
          { this.props.type === 'login' ? 'REGISTER' : 'LOGIN' }
        </Link>
      </form>
    );
  }
}
