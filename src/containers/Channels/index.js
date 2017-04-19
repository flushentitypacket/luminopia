import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Channel from '../../components/Channel';
import { getToken, getChannelsSortedByName } from '../../store/selectors';
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
    const { channels } = this.props;
    return (
      <div>
        {channels.map((c, idx) =>
          <Channel key={idx} name={c.name} videoUris={c.videoUris} />
        )}
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  token: getToken(state),
  channels: getChannelsSortedByName(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (token) => dispatch(fetchChannels(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
