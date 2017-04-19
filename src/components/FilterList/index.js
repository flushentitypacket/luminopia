import React from 'react';
import PropTypes from 'prop-types';

export default class FilterList extends React.Component {
  static propTypes = {
    items: PropTypes.any.isRequired,
    filterFn: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  state = {
    filterValue: '',
  };

  handleChangeFilterValue = (event) => {
    this.setState({ filterValue: event.target.value });
  }

  filter = (items) => {
    return this.props.filterFn(items, this.state.filterValue);
  }

  render = () => {
    const { children, items } = this.props;
    return (
      <div>
        <input
          type="text"
          value={this.state.filterValue}
          onChange={this.handleChangeFilterValue}
        />
        {children(this.filter(items))}
      </div>
    )
  };
}
