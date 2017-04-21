import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class Channel extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    videoUris: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    name: '',
    videoUris: [],
  };

  videoCount = () => this.props.videoUris.length;

  render = () => {
    const { name } = this.props;
    return (
      <div className="ChannelContainer">
        <div className="ChannelHeader">
          <h2 className="ChannelHeaderTitle">{name}</h2>
          <div>
            (<strong>{this.videoCount()}</strong> videos)
          </div>
        </div>
        <p className="ChannelDescription">
          Cool channel description goes here.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    );
  };
}
