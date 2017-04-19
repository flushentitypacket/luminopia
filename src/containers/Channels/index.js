import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, getChannels } from '../../store/selectors';
import { fetchChannels } from '../../store/actions';

export class Channels extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    fetchChannels: PropTypes.func,
  };

  static defaultProps = {
    fetchChannels: () => {},
  };

  componentDidMount = () => {
    const { token, fetchChannels } = this.props;
    if (token) {
      fetchChannels(token);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { token } = nextProps;
    if (token !== this.props.token) {
      this.props.fetchChannels(token);
    }
  };

  render = () => {
    return (
      <div>
        HEYYYYYYYYYYYY
        {JSON.stringify(this.props.channels)}
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  token: getToken(state),
  channels: getChannels(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (token) => dispatch(fetchChannels(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
