import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchJwt } from '../../store/actions';
import { getLoginErrorMessage, getLoginIsWaiting } from '../../store/selectors';

export class Login extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    onSubmit: () => {},
    errorMessage: null,
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
      <form onSubmit={this.handleSubmit}>
        <label>
          code
          <input
            type="text"
            value={this.state.code}
            onChange={this.handleChange}
          />
        </label>
        {errorMessage && <p>{errorMessage}</p>}
        {isWaiting && <p>waiting!!!!!!!!!!!!</p>}
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
  errorMessage: getLoginErrorMessage(state),
  isWaiting: getLoginIsWaiting(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: ({ code }) => dispatch(fetchJwt(code)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
