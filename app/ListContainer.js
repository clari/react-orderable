import classNames from 'classnames';
import Immutable from 'immutable';
import React from 'react';
import Reorderable from '../lib/Reorderable';
import styles from './ListContainer.scss';

class ListContainer extends React.Component {
  static defaultProps = {
    itemHeight: 40,
    itemIds: Immutable.Range(0, 5).map(i => `Item ${i}`).toList(),
  };
  
  constructor(props) {
    super(props);
    
    const { itemIds } = props;
    this.state = {
      itemIds,
    };

    this.getItem = this.getItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  getItem(id, options) {
    return (
      <div className={styles.item}>
        <div
          className={styles.handle}
          onMouseDown={options.onMouseDown}
        >
          <i className={classNames(styles.handleIcon, 'fa', 'fa-bars')}/>
        </div>
        {id}
      </div>
    );
  }

  handleChange(itemIds) {
    this.setState({
      itemIds,
    });
  }

  render() {
    const { itemHeight } = this.props;
    const { itemIds } = this.state;
    return (
      <Reorderable
        className={styles.reorderable}
        itemGetter={this.getItem}
        itemHeight={itemHeight}
        itemIds={itemIds}
        logger={(...args) => console.log(...args)}
        onChange={this.handleChange}
      />
    );
  }
}

export default ListContainer;
