import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './containers/Login';
import Channels from './containers/Channels';
import { getToken } from './store/selectors';
import './App.css';

export class App extends Component {
  render() {
    const { token } = this.props;
    return (
      <div>
        {!token && <Login />}
        {token && <Channels token={token} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: getToken(state),
})

export default connect(mapStateToProps)(App);
