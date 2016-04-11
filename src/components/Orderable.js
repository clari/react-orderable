import areSetsEqual from '../utils/areSetsEqual';
import DraggableItem from './DraggableItem';
import invariant from 'invariant';
import React from 'react';

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

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isDragging(this.state)) {
      const itemIds = new Set(this.getItemIds(this.props.children));
      const nextItemIds = new Set(this.getItemIds(nextProps.children));
      invariant(
        areSetsEqual(itemIds, nextItemIds),
        'Cannot change item id set during drag'
      );
    } else {
      this.setState({
        itemIds: this.getItemIds(nextProps.children),
      });
    }
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

  handleDragEnd() {
    const { onChange } = this.props;
    const { itemIds } = this.state;

    this.setState({
      draggedId: null,
    }, () => {
      onChange(itemIds);
    });
  }

  handleDragMove(options) {
    const { itemSize } = this.props;
    const { draggedId, itemIds, originalItemPosition, startMousePosition } = this.state;

    // Compute the dragged item position, constrained by the list bounds
    const draggedIndex = this.getItemIndex(draggedId);
    if (options.currentMousePosition !== this.state.currentMousePosition) {
      // If the dragged item overlaps the previous item, swap the dragged item with the previous
      // item
      let newIds;
      const itemPosition = originalItemPosition + options.currentMousePosition - startMousePosition;
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
        currentMousePosition: options.currentMousePosition,
        ...(newIds ? { itemIds: newIds } : null),
      });
    }
  }

  handleDragStart(id, options) {
    this.setState({
      currentMousePosition: options.currentMousePosition,
      draggedId: id,
      originalItemPosition: options.originalItemPosition,
      startMousePosition: options.startMousePosition,
    });
  }

  isDragging(state) {
    const { draggedId } = state;
    return draggedId !== null;
  }

  isDraggedItem(id) {
    const { draggedId } = this.state;
    return draggedId === id;
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
      itemIds,
      originalItemPosition,
      startMousePosition,
    } = this.state;

    const childArray = React.Children.toArray(children);

    let draggedItem;
    let minMousePosition;
    let maxMousePosition;
    if (this.isDragging(this.state)) {
      draggedItem = childArray.find(item => this.isDraggedItem(this.getItemId(item)));
      minMousePosition = -(originalItemPosition - startMousePosition);
      maxMousePosition = minMousePosition + itemSize * (itemIds.length - 1);
    }

    return (
      <div
        className={className}
        style={{
          [this.getItemSizeProperty()]: itemSize * React.Children.count(children),
        }}
      >
      {childArray.map(item => {
        const id = this.getItemId(item);
        const index = this.getItemIndex(id);
        const itemPosition = itemSize * index;
        return (
          <DraggableItem
            animated={this.isDragging(this.state) && animated}
            dragging={this.isDraggedItem(id)}
            ghost={ghost}
            horizontal={horizontal}
            itemPosition={itemPosition}
            key={id}
            maxMousePosition={maxMousePosition}
            minMousePosition={minMousePosition}
            onDragEnd={this.handleDragEnd}
            onDragMove={this.handleDragMove}
            onDragStart={options => this.handleDragStart(id, options)}
          >
            {React.cloneElement(item, {
              style: {
                [this.getItemSizeProperty()]: itemSize,
                [this.getItemPositionProperty()]: itemPosition,
                ...item.props.style,
              },
            })}
          </DraggableItem>
        );
      })}
      {this.isDragging(this.state) && React.cloneElement(draggedItem, {
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
