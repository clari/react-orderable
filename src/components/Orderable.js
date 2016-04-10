import clamp from 'lodash.clamp';
import classNames from 'classnames';
import Immutable from 'immutable';
import invariant from 'invariant';
import React from 'react';
import styles from './Orderable.scss';

class Orderable extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    itemHeight: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { children } = props;
    this.state = {
      currentY: null,
      draggedId: null,
      itemIds: this.getItemIds(children),
      originalY: null,
      startY: null,
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
      const itemIds = this.getItemIds(this.props.children).toSet();
      const nextItemIds = this.getItemIds(nextProps.children).toSet();
      invariant(
        Immutable.is(itemIds, nextItemIds),
        'Cannot change item id set during drag'
      );
    }
  }

  componentWillUnmount() {
    // Clean up global event listeners if we unmount in the middle of a drag
    this.removeListeners();
  }

  getItemIds(children) {
    return Immutable.List(React.Children.toArray(children)).map(item => item.props.id);
  }

  handleMouseDown(id, e) {
    const { itemHeight } = this.props;
    const { itemIds } = this.state;

    e.preventDefault(); // Prevent selection

    const draggedIndex = itemIds.indexOf(id);
    this.setState({
      currentY: e.clientY,
      draggedId: id,
      // The dragged item's position is relative to its original position, not to the position 
      // computed by its current index
      originalY: itemHeight * draggedIndex,
      startY: e.clientY,
    });

    this.addListeners();
  }

  handleMouseMove(e) {
    const { itemHeight } = this.props;
    const { draggedId, itemIds, originalY, startY } = this.state;

    // Compute the dragged item position, constrained by the list bounds
    const draggedIndex = itemIds.indexOf(draggedId);
    const minY = -(originalY - startY);
    const maxY = minY + itemHeight * (itemIds.size - 1);
    const currentY = clamp(e.clientY, minY, maxY);
    if (currentY !== this.state.currentY) {
      // If the dragged item overlaps the previous item, swap the dragged item with the previous 
      // item
      let newIds;
      const top = originalY + currentY - startY;
      if (draggedIndex !== 0) {
        const prevIndex = draggedIndex - 1;
        const prevTop = itemHeight * prevIndex;
        if ((top - prevTop) / itemHeight < 0.5) {
          newIds = itemIds
            .set(draggedIndex, itemIds.get(prevIndex))
            .set(prevIndex, itemIds.get(draggedIndex));
        }
      }

      // If the dragged item overlaps the next item, swap the dragged item with the next item
      if (draggedIndex !== itemIds.size - 1) {
        const nextIndex = draggedIndex + 1;
        const nextTop = itemHeight * nextIndex;
        if ((nextTop - top) / itemHeight < 0.5) {
          newIds = itemIds
            .set(draggedIndex, itemIds.get(nextIndex))
            .set(nextIndex, itemIds.get(draggedIndex));
        }
      }

      this.setState({
        currentY,
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
      children,
      className,
      itemHeight,
    } = this.props;

    const {
      currentY,
      itemIds,
      originalY,
      startY,
    } = this.state;

    return (
      <div
        className={className}
        style={{
          height: itemHeight * React.Children.count(children),
        }}
      >
        {React.Children.map(children, item => {
          const id = item.props.id;
          const index = itemIds.indexOf(id);
          return React.cloneElement(item, {
            className: classNames(
              styles.item,
              item.props.className
            ),
            dragging: this.isDraggedItem(id),
            onHandleMouseDown: e => this.handleMouseDown(id, e),
            style: {
              height: itemHeight,
              // If this item is the dragged item, position it based on the mouse position
              top: this.isDraggedItem(id) ? originalY + currentY - startY : itemHeight * index,
              ...item.props.style,
            },
          });
        })}
      </div>
    );
  }
}

export default Orderable;
