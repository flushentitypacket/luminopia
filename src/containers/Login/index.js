import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchJwt } from '../../store/actions';

export class Login extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: () => {},
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
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: ({ code }) => dispatch(fetchJwt(code)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
