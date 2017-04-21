import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from './components/Logo';
import Login from './containers/Login';
import Channels from './containers/Channels';
import { getToken } from './store/selectors';
import './App.css';

export class App extends Component {
  static propTypes = {
    token: PropTypes.string,
  };

  static defaultProps = {
    token: null,
  };

  render() {
    const { token } = this.props;
    return (
      <div className="AppContainer">
        <div className="AppHeaderContainer">
          <Logo />
        </div>
        <div className="AppBodyContainer">
          {!token && <Login />}
          {token && <Channels token={token} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: getToken(state),
})

export default connect(mapStateToProps)(App);
