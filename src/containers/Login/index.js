import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginActions } from '../../store/actions';
import { loginSelectors } from '../../store/selectors';
import './styles.css';

export class Login extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    errorMessage: PropTypes.string,
    isWaiting: PropTypes.bool,
  };

  static defaultProps = {
    onSubmit: () => {},
    errorMessage: null,
    isWaiting: false,
  };

  state = {
    code: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { code } = this.state;
    this.props.onSubmit({ code });
  };

  handleChange = (event) => {
    this.setState({ code: event.target.value });
  };

  render = () => {
    const { errorMessage, isWaiting } = this.props;
    return (
      <div className="LoginContainer">
        <p>Please enter your access code.</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="code"
            value={this.state.code}
            onChange={this.handleChange}
          />
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          {isWaiting && <p>waiting!!!!!!!!!!!!</p>}
        </form>
      </div>
    );
  };
}

const { getLoginErrorMessage, getLoginIsWaiting } = loginSelectors;

const mapStateToProps = (state) => ({
  errorMessage: getLoginErrorMessage(state),
  isWaiting: getLoginIsWaiting(state),
})

const { fetchJwt } = loginActions;

const mapDispatchToProps = (dispatch) => ({
  onSubmit: ({ code }) => dispatch(fetchJwt(code)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
