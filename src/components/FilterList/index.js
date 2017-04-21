import React from 'react';
import PropTypes from 'prop-types';

export default class FilterList extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    filterFn: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    items: [],
    filterFn: (item, filterValue) => true,
    label: null,
  }

  state = {
    filterValue: '',
  };

  handleChangeFilterValue = (event) => {
    this.setState({ filterValue: event.target.value });
  }

  filter = (items) => {
    const { filterFn } = this.props;
    const { filterValue } = this.state;
    return items.filter(item => filterFn(item, filterValue));
  }

  render = () => {
    const { label, children, items } = this.props;
    return (
      <div>
        <label>
          {label}
          <input
            type="text"
            value={this.state.filterValue}
            onChange={this.handleChangeFilterValue}
          />
        </label>
        {this.filter(items).map(item => children(item))}
      </div>
    )
  };
}
