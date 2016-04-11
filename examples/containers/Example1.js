import ExampleItem from './ExampleItem';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Orderable from '../../src/components/Orderable';
import React from 'react';
import styles from './Example1.scss';

class Example1 extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    items: ImmutablePropTypes.list.isRequired,
  };
  
  static defaultProps = {
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

  handleChange(ids) {
    const { items } = this.state;
    
    const itemIndex = items.reduce((result, item) => {
      return result.set(item.get('id'), item);
    }, Immutable.Map());
    
    this.setState({
      items: ids.map(id => itemIndex.get(id)),
    });
  }
  
  render() {
    const { className } = this.props;
    const { items } = this.state;
    return (
      <div className={className}>
        <Orderable
          className={styles.orderable}
          itemSize={40}
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

export default Example1;
