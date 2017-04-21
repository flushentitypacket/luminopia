import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterList from '../../components/FilterList';
import Channel from '../../components/Channel';
import { getToken } from '../../store/selectors';
import { channelsSelectors } from '../../store/selectors';
import { channelsActions } from '../../store/actions';
import './styles.css';

export class Channels extends React.Component {
  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.object),
    token: PropTypes.string,
    fetchChannels: PropTypes.func,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    channels: [],
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
        <p>Choose a channel from our exciting selection of educational and entertaining content!</p>

        <FilterList
          label="Filter by name: "
          items={channels.map((c, idx) => ({
            key: idx,
            name: c.name,
            videoUris: c.videoUris
          }))}
          filterFn={(item, filterValue) =>
            item.name.toUpperCase().includes(filterValue.toUpperCase())
          }
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

const {
  getChannelsSortedByName,
  getChannelsErrorMessage,
  getChannelsIsWaiting,
} = channelsSelectors;

const mapStateToProps = (state) => ({
  token: getToken(state),
  channels: getChannelsSortedByName(state),
  errorMessage: getChannelsErrorMessage(state),
  isWaiting: getChannelsIsWaiting(state),
})

const { fetchChannels } = channelsActions;

const mapDispatchToProps = (dispatch) => ({
  fetchChannels: (token) => dispatch(fetchChannels(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
