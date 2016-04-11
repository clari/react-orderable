import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import styles from './ExampleItem.scss';

class ExampleItem extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    dragging: React.PropTypes.bool,
    item: ImmutablePropTypes.map.isRequired,
    onDragStart: React.PropTypes.func,
    style: React.PropTypes.object,
  };
  
  render() {
    const {
      className,
      dragging,
      item,
      onDragStart,
      style,
    } = this.props;

    return (
      <div
        className={classNames(
          styles.item,
          dragging && styles['item--dragging'],
          className
        )}
        onMouseDown={onDragStart}
        style={style}
      >
        {item.get('name')}
      </div>
    );
  }
}

export default ExampleItem;
