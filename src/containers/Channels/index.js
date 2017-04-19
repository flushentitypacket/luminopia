import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterList from '../../components/FilterList';
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
        <FilterList
          items={channels.map((c, idx) => ({
            key: idx,
            name: c.name,
            videoUris: c.videoUris
          }))}
          filterFn={(items, filterValue) =>
            items.filter(item =>
              item.name.toUpperCase().includes(filterValue.toUpperCase())
            )
          }
        >
          {items => items.map(item => {
            const { key, ...props } = item;
            return <Channel key={key} {...props} />;
          })}
        </FilterList>
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
