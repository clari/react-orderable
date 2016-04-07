import classNames from 'classnames';
import Immutable from 'immutable';
import React from 'react';
import Reorderable from '../lib/Reorderable';
import styles from './ListContainer.scss';

class ListContainer extends React.Component {
  static defaultProps = {
    horizontalItemIds: Immutable.Range(0, 5).map(i => `Horiz ${i}`).toList(),
    itemHeight: 40,
    itemWidth: 120,
    verticalItemIds: Immutable.Range(0, 5).map(i => `Vert ${i}`).toList(),
  };
  
  constructor(props) {
    super(props);
    
    const { horizontalItemIds, verticalItemIds } = props;
    this.state = {
      horizontalItemIds,
      verticalItemIds,
    };

    this.getItem = this.getItem.bind(this);
    this.handleHorizontalChange = this.handleHorizontalChange.bind(this);
    this.handleVerticalChange = this.handleVerticalChange.bind(this);
  }

  getItem(id, options) {
    return (
      <div className={classNames(styles.item, styles[`item--${options.axis}`])}>
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

  handleHorizontalChange(itemIds) {
    this.setState({
      horizontalItemIds: itemIds,
    });
  }

  handleVerticalChange(itemIds) {
    this.setState({
      verticalItemIds: itemIds,
    });
  }

  log(...args) {
    console.log(...args);
  }

  render() {
    const { itemHeight, itemWidth } = this.props;
    const { horizontalItemIds, verticalItemIds } = this.state;
    return (
      <div className={styles.container}>
        <Reorderable
          className={styles.verticalReorderable}
          itemGetter={(id, options) => this.getItem(id, {
            axis: 'y',
            ...options,
          })}
          itemIds={verticalItemIds}
          itemSize={itemHeight}
          logger={this.log}
          onChange={this.handleVerticalChange}
        />
        <Reorderable
          axis="x"
          className={styles.horizontalReorderable}
          itemGetter={(id, options) => this.getItem(id, {
            axis: 'x',
            ...options,
          })}
          itemIds={horizontalItemIds}
          itemSize={itemWidth}
          logger={this.log}
          onChange={this.handleHorizontalChange}
        />
      </div>
    );
  }
}

export default ListContainer;
