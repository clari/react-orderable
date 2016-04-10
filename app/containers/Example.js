import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ExampleItem from './ExampleItem';
import Orderable from '../../src/components/Orderable';
import React from 'react';
import styles from './Example.scss';

class Example extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    items: ImmutablePropTypes.list.isRequired,
    itemHeight: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    itemHeight: 40,
    items: Immutable.Range(0, 5).map(i => {
      return Immutable.Map({
        id: i,
        name: `Item ${i}`,
      });
    }).toList(),
  };

  constructor(props) {
    super(props);

    const { items } = props;
    this.state = {
      items,
    };
    
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const {
      className,
      itemHeight,
    } = this.props;

    const { items } = this.state;

    return (
      <Orderable 
        className={className}
        draggedClassName={styles['item--dragged']}
        itemHeight={itemHeight}
        onChange={this.handleChange}
      >
        {items.map((item, i) => {
          return (
            <ExampleItem
              id={item.get('id')}
              item={item}
              key={i}
            />
          );
        })}
      </Orderable>
    );
  }
}

export default Example;
