import classNames from 'classnames';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ExampleItem from './ExampleItem';
import Orderable from '../../src/components/Orderable';
import React from 'react';
import styles from './Example.scss';

class Example extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    itemHeight: React.PropTypes.number.isRequired,
    items: ImmutablePropTypes.list.isRequired,
    itemWidth: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    itemHeight: 40,
    items: Immutable.Range(0, 5).map(i => {
      return Immutable.Map({
        id: i,
        name: `Item ${i}`,
      });
    }).toList(),
    itemWidth: 120,
  };

  constructor(props) {
    super(props);

    const { items } = props;
    this.state = {
      items,
      horizontal: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleHorizontalChange = this.handleHorizontalChange.bind(this);
  }

  handleChange(itemIds) {
    const { items } = this.state;
    
    const itemIndex = items.reduce((result, item) => {
      return result.set(item.get('id'), item);
    }, Immutable.Map());
    
    this.setState({
      items: itemIds.map(id => itemIndex.get(id)),
    });
  }

  handleHorizontalChange(e) {
    this.setState({
      horizontal: e.currentTarget.checked,
    });
  }

  render() {
    const { className, itemHeight, itemWidth } = this.props;
    const { horizontal, items } = this.state;

    return (
      <div>
        <div>
          <label>
            <input
              onChange={this.handleHorizontalChange}
              type="checkbox"
              value={horizontal}
            />
            Horizontal
          </label>
        </div>
        <Orderable 
          animated
          className={classNames(
            styles.orderable,
            horizontal && styles['orderable--horizontal'],
            className
          )}
          horizontal={horizontal}
          ghost
          itemSize={horizontal ? itemWidth : itemHeight}
          onChange={this.handleChange}
        >
          {items.map(item => {
            return (
              <ExampleItem
                id={item.get('id')}
                item={item}
                key={item.get('id')}
              />
            );
          })}
        </Orderable>
      </div>
    );
  }
}

export default Example;
