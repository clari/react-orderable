import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import styles from './ExampleItem.scss'; 

class ExampleItem extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    dragging: React.PropTypes.bool,
    ghost: React.PropTypes.bool,
    item: ImmutablePropTypes.map.isRequired,
    onHandleMouseDown: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  render() {
    const {
      className,
      dragging,
      ghost,
      item,
      onHandleMouseDown,
      style,
    } = this.props;
    
    return (
      <div
        className={classNames(
          styles.item,
          dragging && styles['item--dragging'],
          ghost && styles['item--ghost'],
          className
        )}
        style={style}
      >
        <button
          className={classNames(
            styles.handle,
            dragging && styles['handle--dragging'],
          )}
          onMouseDown={onHandleMouseDown}
          type="button"
        >
          <i className={classNames(styles.handleIcon, 'fa', 'fa-bars')} />
        </button>
        {item.get('name')}
      </div>
    );
  }
}

export default ExampleItem;
