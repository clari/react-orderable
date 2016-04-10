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
    
    this.state = {
      touchIdentifier: null,
    };

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }

  addListeners() {
    if (this.isTouch()) {
      document.addEventListener('touchmove', this.handleDragMove);
      document.addEventListener('touchend', this.handleDragEnd);
    } else {
      document.addEventListener('mousemove', this.handleDragMove);
      document.addEventListener('mouseup', this.handleDragEnd);
    }
  }

  componentWillUnmount() {
    // Clean up global event listeners if we unmount in the middle of a drag
    this.removeListeners();
  }

  getMousePosition(e) {
    const { horizontal } = this.props;
    const position = e.targetTouches ? e.targetTouches[0] : e;
    return horizontal ? position.clientX : position.clientY;
  }

  getTouchIdentifier(e) {
    return e.targetTouches ? e.targetTouches[0].identifier : null;
  }

  handleDragEnd(e) {
    const { onDragEnd } = this.props;

    if (!this.isCurrentTouch(this.getTouchIdentifier(e))) {
      return;
    }

    onDragEnd();

    this.removeListeners();
  }

  handleDragMove(e) {
    const { maxMousePosition, minMousePosition, onDragMove } = this.props;

    if (!this.isCurrentTouch(this.getTouchIdentifier(e))) {
      return;
    }

    const currentMousePosition = clamp(
      this.getMousePosition(e),
      minMousePosition,
      maxMousePosition
    );

    onDragMove({
      currentMousePosition,
    });
  }

  handleDragStart(e) {
    const { itemPosition, onDragStart } = this.props;
    
    e.preventDefault(); // Prevent selection

    const currentMousePosition = this.getMousePosition(e);
    this.setState({
      touchIdentifier: this.getTouchIdentifier(e),
    }, () => {
      onDragStart({
        currentMousePosition,
        // The dragged item's position is relative to its original position, not to the position
        // computed by its current index
        originalItemPosition: itemPosition,
        startMousePosition: currentMousePosition,
      });

      this.addListeners();
    });
  }

  isCurrentTouch(touchIdentifier) {
    return this.state.touchIdentifier === touchIdentifier;
  }

  isTouch() {
    const { touchIdentifier } = this.state;
    return touchIdentifier !== null;
  }

  removeListeners() {
    if (this.isTouch()) {
      document.removeEventListener('touchmove', this.handleDragMove);
      document.removeEventListener('touchend', this.handleDragEnd);
    } else {
      document.removeEventListener('mousemove', this.handleDragMove);
      document.removeEventListener('mouseup', this.handleDragEnd);
    }
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
      onDragStart: this.handleDragStart,
    });
  }
}

export default DraggableItem;
