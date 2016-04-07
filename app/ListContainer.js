import classNames from 'classnames';
import Immutable from 'immutable';
import Orderable from '../src/Orderable';
import React from 'react';
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
      horizontalItemIds: Immutable.List(itemIds),
    });
  }

  handleVerticalChange(itemIds) {
    this.setState({
      verticalItemIds: Immutable.List(itemIds),
    });
  }

  // log(...args) {
  //   console.log(...args);
  // }

  render() {
    const { itemHeight, itemWidth } = this.props;
    const { horizontalItemIds, verticalItemIds } = this.state;
    return (
      <div className={styles.container}>
        <Orderable
          className={styles.verticalOrderable}
          itemGetter={(id, options) => this.getItem(id, {
            axis: 'y',
            ...options,
          })}
          itemIds={verticalItemIds.toArray()}
          itemSize={itemHeight}
          logger={this.log}
          onChange={this.handleVerticalChange}
        />
        <Orderable
          axis="x"
          className={styles.horizontalOrderable}
          itemGetter={(id, options) => this.getItem(id, {
            axis: 'x',
            ...options,
          })}
          itemIds={horizontalItemIds.toArray()}
          itemSize={itemWidth}
          logger={this.log}
          onChange={this.handleHorizontalChange}
        />
        {process.env.NODE_ENV === 'production' && <a href="https://github.com/clariussystems/react-orderable">
          <img
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
            src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
            style={{
              border: 0,
              position: 'fixed',
              top: 0,
              right: 0,
            }}
          />
        </a>}
      </div>
    );
  }
}

export default ListContainer;
