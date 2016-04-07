import classNames from 'classnames';
import React from 'react';
import styles from './Orderable.scss';

class Orderable extends React.Component {
  static defaultProps = {
    axis: 'y',
  };
  
  constructor(props) {
    super(props);

    const { itemIds } = props;
    this.state = {
      currentMousePosition: 0,
      draggingId: null,
      itemIds,
      originalItemPosition: 0,
      startMousePosition: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  clamp(itemPosition) {
    const { itemSize } = this.props;
    const { itemIds } = this.state;
    return Math.max(0, Math.min(itemSize * (itemIds.size - 1), itemPosition));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      itemIds: nextProps.itemIds,
    });
  }

  getItemPositionProperty() {
    const { axis } = this.props;
    return axis === 'x' ? 'left' : 'top';
  }

  getMousePositionProperty() {
    const { axis } = this.props;
    return axis === 'x' ? 'clientX' : 'clientY';
  }

  getSizeProperty() {
    const { axis } = this.props;
    return axis === 'x' ? 'width' : 'height';
  }

  handleMouseDown(id, e) {
    const { itemSize } = this.props;
    const { itemIds } = this.state;
    const draggingIndex = itemIds.indexOf(id);
    this.setState({
      currentMousePosition: e[this.getMousePositionProperty()],
      draggingId: id,
      originalItemPosition: itemSize * draggingIndex,
      startMousePosition: e[this.getMousePositionProperty()],
    });

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e) {
    const { itemSize } = this.props;
    const { draggingId, itemIds, originalItemPosition, startMousePosition } = this.state;
    const currentMousePosition = e[this.getMousePositionProperty()];
    this.setState({
      currentMousePosition,
    });

    // If the item is moved and covers more than 50% of a different item, swap places.
    const draggingIndex = itemIds.indexOf(draggingId);
    const itemPosition = this.clamp(
      originalItemPosition + currentMousePosition - startMousePosition
    );
    let newItemIds;
    if (draggingIndex !== 0) {
      const prevIndex = draggingIndex - 1;
      const prevItemPosition = itemSize * prevIndex;
      if ((itemPosition - prevItemPosition) / itemSize < 0.5) {
        this.log('swap prev', draggingIndex);
        newItemIds = itemIds
          .set(prevIndex, draggingId)
          .set(draggingIndex, itemIds.get(prevIndex));
      }
    }

    if (draggingIndex !== itemIds.size) {
      const nextIndex = draggingIndex + 1;
      const nextItemPosition = itemSize * nextIndex;
      if ((nextItemPosition - itemPosition) / itemSize < 0.5) {
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
    const {
      axis,
      className,
      itemGetter,
      itemIds: originalItemIds,
      itemSize,
    } = this.props;

    const {
      currentMousePosition,
      draggingId,
      itemIds,
      originalItemPosition,
      startMousePosition,
    } = this.state;

    // While dragging, we need to preserve the original order in order to support animation.
    return (
      <div
        className={className}
        style={{
          [this.getSizeProperty()]: itemSize * itemIds.size,
        }}
      >
        {originalItemIds.map(id => {
          const index = itemIds.indexOf(id);
          const dragging = draggingId === id;
          const itemComponent = itemGetter(id, {
            onMouseDown: e => this.handleMouseDown(id, e),
          });

          return React.cloneElement(itemComponent, {
            className: classNames(
              styles.item,
              styles[`item--${axis}`],
              dragging && styles['item--dragging'],
              itemComponent.props.className
            ),
            key: id,
            style: {
              [this.getItemPositionProperty()]: dragging ?
                this.clamp(originalItemPosition + currentMousePosition - startMousePosition) :
                itemSize * index,
              [this.getSizeProperty()]: itemSize,
            },
          });
        })}
      </div>
    );
  }
}

export default Orderable;
