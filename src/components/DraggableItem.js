import clamp from 'lodash.clamp';
import classNames from 'classnames';
import React from 'react';
import styles from './DraggableItem.scss';

class DraggableItem extends React.Component {
  static propTypes = {
    animated: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    dragging: React.PropTypes.bool,
    ghost: React.PropTypes.bool,
    horizontal: React.PropTypes.bool,
    itemPosition: React.PropTypes.number.isRequired,
    maxMousePosition: React.PropTypes.number,
    minMousePosition: React.PropTypes.number,
    onDragEnd: React.PropTypes.func.isRequired,
    onDragMove: React.PropTypes.func.isRequired,
    onDragStart: React.PropTypes.func.isRequired,
  };
  
  constructor(props) {
    super(props);
    
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  addListeners() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    // Clean up global event listeners if we unmount in the middle of a drag
    this.removeListeners();
  }

  getMousePosition(e) {
    const { horizontal } = this.props;
    return horizontal ? e.clientX : e.clientY;
  }

  handleMouseDown(e) {
    const { itemPosition, onDragStart } = this.props;
    
    e.preventDefault(); // Prevent selection

    onDragStart({
      currentMousePosition: this.getMousePosition(e),
      // The dragged item's position is relative to its original position, not to the position 
      // computed by its current index
      originalItemPosition: itemPosition,
      startMousePosition: this.getMousePosition(e),
    });

    this.addListeners();
  }

  handleMouseMove(e) {
    const { maxMousePosition, minMousePosition, onDragMove } = this.props;
    const currentMousePosition = clamp(
      this.getMousePosition(e),
      minMousePosition,
      maxMousePosition
    );

    onDragMove({
      currentMousePosition,
    });
  }

  handleMouseUp() {
    const { onDragEnd } = this.props;
    
    onDragEnd();

    this.removeListeners();
  }

  removeListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
  
  render() {
    const { 
      animated,
      children: item,
      className,
      dragging,
      ghost,
      horizontal,
    } = this.props;
    
    return React.cloneElement(item, {
      className: classNames(
        styles.item,
        horizontal && styles['item--horizontal'],
        animated && styles['item--animated'],
        // Default ghost style
        // Even if we don't render the ghost item, we need to keep it around for the drag event 
        // handlers.
        !ghost && dragging && styles['item--ghost'],
        item.props.className,
        className
      ),
      ghost: ghost && dragging,
      onHandleMouseDown: this.handleMouseDown,
    });
  }
}

export default DraggableItem;
