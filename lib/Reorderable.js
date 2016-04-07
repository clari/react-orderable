import classNames from 'classnames';
import React from 'react';
import styles from './Reorderable.scss';

class Reorderable extends React.Component {
  constructor(props) {
    super(props);

    const { itemIds } = props;
    this.state = {
      currentY: 0,
      draggingId: null,
      itemIds,
      originalY: 0,
      startY: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  clamp(top) {
    const { itemHeight } = this.props;
    const { itemIds } = this.state;
    return Math.max(0, Math.min(itemHeight * (itemIds.size - 1), top));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      itemIds: nextProps.itemIds,
    });
  }

  handleMouseDown(id, e) {
    const { itemHeight } = this.props;
    const { itemIds } = this.state;
    const draggingIndex = itemIds.indexOf(id);
    this.setState({
      currentY: e.clientY,
      draggingId: id,
      originalY: itemHeight * draggingIndex,
      startY: e.clientY,
    });

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e) {
    const { itemHeight } = this.props;
    const { draggingId, itemIds, originalY, startY } = this.state;
    const currentY = e.clientY;
    this.setState({
      currentY,
    });

    // If the item is moved and covers more than 50% of a different item, swap places.
    const draggingIndex = itemIds.indexOf(draggingId);
    const top = this.clamp(originalY + currentY - startY);
    let newItemIds;
    if (draggingIndex !== 0) {
      const prevIndex = draggingIndex - 1;
      const prevTop = itemHeight * prevIndex;
      if ((top - prevTop) / itemHeight < 0.5) {
        this.log('swap prev', draggingIndex);
        newItemIds = itemIds
          .set(prevIndex, draggingId)
          .set(draggingIndex, itemIds.get(prevIndex));
      }
    }

    if (draggingIndex !== itemIds.size) {
      const nextIndex = draggingIndex + 1;
      const nextTop = itemHeight * nextIndex;
      if ((nextTop - top) / itemHeight < 0.5) {
        this.log('swap next', draggingIndex);
        newItemIds = itemIds
          .set(nextIndex, draggingId)
          .set(draggingIndex, itemIds.get(nextIndex));
      }
    }

    if (newItemIds) {
      this.log('new item ids', newItemIds.toJS());
      this.setState({
        itemIds: newItemIds,
      });
    }
  }

  handleMouseUp() {
    const { onChange } = this.props;
    const { itemIds } = this.state;

    this.setState({
      draggingId: null,
    });

    onChange(itemIds);

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  log(...args) {
    const { logger } = this.props;
    if (logger) {
      logger(...args);
    }
  }

  render() {
    const { className, itemGetter, itemHeight, itemIds: originalItemIds } = this.props;
    const { currentY, draggingId, itemIds, originalY, startY } = this.state;

    // While dragging, we need to preserve the original order in order to support animation.
    return (
      <div className={className}>
        {originalItemIds.map(id => {
          const index = itemIds.indexOf(id);
          const dragging = draggingId === id;
          const itemComponent = itemGetter(id, {
            onMouseDown: e => this.handleMouseDown(id, e),
          });

          return React.cloneElement(itemComponent, {
            className: classNames(
              styles.item,
              dragging && styles['item--dragging'],
              itemComponent.props.className
            ),
            key: id,
            style: {
              top: dragging ? this.clamp(originalY + currentY - startY) : itemHeight * index,
              height: itemHeight,
            },
          });
        })}
      </div>
    );
  }
}

export default Reorderable;
