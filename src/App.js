import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './containers/Login';
import Channels from './containers/Channels';
import { getToken } from './store/selectors';
import logo from './logo.svg';
import './App.css';

export class App extends Component {
  render() {
    const { message, token } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{message}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <Login />
        </div>

        <div>
          <Channels token={token} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: 'Welcome to React',
  token: getToken(state),
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
