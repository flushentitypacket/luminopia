import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterList from '../../components/FilterList';
import Channel from '../../components/Channel';
import {
  getToken,
  getChannelsSortedByName,
  getChannelsErrorMessage,
  getChannelsIsWaiting,
} from '../../store/selectors';
import { fetchChannels } from '../../store/actions';

export class Channels extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    fetchChannels: PropTypes.func,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    token: null,
    fetchChannels: () => {},
    errorMessage: null,
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
    const { isWaiting, channels, errorMessage } = this.props;
    return (
      <div>
        {isWaiting && <p>waiting!!!!!!!!!!!!</p>}
        <FilterList
          items={channels.map((c, idx) => ({
            key: idx,
            name: c.name,
            videoUris: c.videoUris
          }))}
        >
          {item => {
            const { key, ...props } = item;
            return <Channel key={key} {...props} />;
          }}
        </FilterList>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  token: getToken(state),
  channels: getChannelsSortedByName(state),
  errorMessage: getChannelsErrorMessage(state),
  isWaiting: getChannelsIsWaiting(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (token) => dispatch(fetchChannels(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
