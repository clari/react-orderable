import classNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import styles from './Song.scss';

class Song extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    dragging: React.PropTypes.bool,
    song: ImmutablePropTypes.map.isRequired,
    ghost: React.PropTypes.bool,
    onHandleMouseDown: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  render() {
    const { className, dragging, ghost, onHandleMouseDown, song, style } = this.props;

    return (
      <div
        className={classNames(
          styles.song,
          dragging && styles['song--dragging'],
          ghost && styles['song--ghost'],
          className
        )}
        style={style}
      >
        <div
          className={classNames(
            styles.handle,
            dragging && styles['handle--dragging']
          )}
          onMouseDown={onHandleMouseDown}
        >
          <i className={classNames(styles.handleIcon, 'fa', 'fa-bars')} />
        </div>
        <div className={styles.songInfo}>
          <div className={styles.name}>
            {song.get('name')}
          </div>
          <div className={styles.footer}>
            <div className={styles.artist}>
              {song.get('artist')}
            </div>
            <div className={styles.time}>
              {song.get('time')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Song;
