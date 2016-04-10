import areSetsEqual from '../utils/areSetsEqual';
import clamp from 'lodash.clamp';
import classNames from 'classnames';
import invariant from 'invariant';
import React from 'react';
import styles from './Orderable.scss';

class Orderable extends React.Component {
  static propTypes = {
    animated: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    ghost: React.PropTypes.bool,
    horizontal: React.PropTypes.bool,
    itemSize: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { children } = props;
    this.state = {
      currentMousePosition: null,
      draggedId: null,
      itemIds: this.getItemIds(children),
      originalItemPosition: null,
      startMousePosition: null,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  addListeners() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.isDragging(nextState)) {
      const itemIds = new Set(this.getItemIds(this.props.children));
      const nextItemIds = new Set(this.getItemIds(nextProps.children));
      invariant(
        areSetsEqual(itemIds, nextItemIds),
        'Cannot change item id set during drag'
      );
    }
  }

  componentWillUnmount() {
    // Clean up global event listeners if we unmount in the middle of a drag
    this.removeListeners();
  }

  getItemId(item) {
    return item.props.id;
  }

  getItemIds(children) {
    return React.Children.toArray(children).map(item => this.getItemId(item));
  }

  getItemIndex(id) {
    const { itemIds } = this.state;
    return itemIds.indexOf(id);
  }

  getItemPositionProperty() {
    const { horizontal } = this.props;
    return horizontal ? 'left' : 'top';
  }

  getItemSizeProperty() {
    const { horizontal } = this.props;
    return horizontal ? 'width' : 'height';
  }

  getMousePosition(e) {
    const { horizontal } = this.props;
    return horizontal ? e.clientX : e.clientY;
  }

  handleMouseDown(id, e) {
    const { itemSize } = this.props;

    e.preventDefault(); // Prevent selection

    this.setState({
      currentMousePosition: this.getMousePosition(e),
      draggedId: id,
      // The dragged item's position is relative to its original position, not to the position 
      // computed by its current index
      originalItemPosition: itemSize * this.getItemIndex(id),
      startMousePosition: this.getMousePosition(e),
    });

    this.addListeners();
  }

  handleMouseMove(e) {
    const { itemSize } = this.props;
    const { draggedId, itemIds, originalItemPosition, startMousePosition } = this.state;

    // Compute the dragged item position, constrained by the list bounds
    const draggedIndex = this.getItemIndex(draggedId);
    const minMousePosition = -(originalItemPosition - startMousePosition);
    const maxMousePosition = minMousePosition + itemSize * (itemIds.length - 1);
    const currentMousePosition = clamp(
      this.getMousePosition(e),
      minMousePosition,
      maxMousePosition
    );
    if (currentMousePosition !== this.state.currentMousePosition) {
      // If the dragged item overlaps the previous item, swap the dragged item with the previous 
      // item
      let newIds;
      const itemPosition = originalItemPosition + currentMousePosition - startMousePosition;
      if (draggedIndex !== 0) {
        const prevIndex = draggedIndex - 1;
        const prevItemPosition = itemSize * prevIndex;
        if ((itemPosition - prevItemPosition) / itemSize < 0.5) {
          newIds = itemIds.slice();
          newIds[draggedIndex] = itemIds[prevIndex];
          newIds[prevIndex] = itemIds[draggedIndex];
        }
      }

      // If the dragged item overlaps the next item, swap the dragged item with the next item
      if (draggedIndex !== itemIds.length - 1) {
        const nextIndex = draggedIndex + 1;
        const nextItemPosition = itemSize * nextIndex;
        if ((nextItemPosition - itemPosition) / itemSize < 0.5) {
          newIds = itemIds.slice();
          newIds[draggedIndex] = itemIds[nextIndex];
          newIds[nextIndex] = itemIds[draggedIndex];
        }
      }

      this.setState({
        currentMousePosition,
        ...(newIds ? { itemIds: newIds } : null),
      });
    }
  }

  handleMouseUp() {
    const { onChange } = this.props;
    const { itemIds } = this.state;

    this.setState({
      draggedId: null,
    }, () => {
      onChange(itemIds);
    });

    this.removeListeners();
  }

  isDragging(state) {
    const { draggedId } = state;
    return draggedId !== null;
  }

  isDraggedItem(id) {
    const { draggedId } = this.state;
    return draggedId === id;
  }

  removeListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const {
      animated,
      children,
      className,
      ghost,
      horizontal,
      itemSize,
    } = this.props;

    const {
      currentMousePosition,
      draggedId,
      originalItemPosition,
      startMousePosition,
    } = this.state;

    const childArray = React.Children.toArray(children);

    let draggedItem;
    if (this.isDragging(this.state)) {
      draggedItem = childArray.find(item => this.getItemId(item) === draggedId);
    }

    return (
      <div
        className={className}
        style={{
          [this.getItemSizeProperty()]: itemSize * React.Children.count(children),
        }}
      >
        {childArray
          .filter(item => ghost || this.getItemId(item) !== draggedId)
          .map(item => {
            const id = this.getItemId(item);
            const index = this.getItemIndex(id);
            return React.cloneElement(item, {
              className: classNames(
                styles.item,
                horizontal && styles['item--horizontal'],
                // Disable animation outside of drag
                this.isDragging(this.state) && animated && styles['item--animated'],
                item.props.className
              ),
              ghost: this.isDraggedItem(id),
              onHandleMouseDown: e => this.handleMouseDown(id, e),
              style: {
                [this.getItemSizeProperty()]: itemSize,
                [this.getItemPositionProperty()]: itemSize * index,
                ...item.props.style,
              },
            });
          })}
        {this.isDragging(this.state) && React.cloneElement(draggedItem, {
          className: classNames(
            styles.item,
            horizontal && styles['item--horizontal'],
            draggedItem.props.className
          ),
          dragging: true,
          style: {
            [this.getItemSizeProperty()]: itemSize,
            // Position the dragged item based on the mouse position
            [this.getItemPositionProperty()]: originalItemPosition +
              currentMousePosition -
              startMousePosition,
            ...draggedItem.props.style,
          },
        })}
      </div>
    );
  }
}

export default Orderable;
