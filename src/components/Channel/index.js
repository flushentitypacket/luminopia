import React from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <p>{name} <strong>{this.videoCount()}</strong></p>
      </div>
    )
  };
}
