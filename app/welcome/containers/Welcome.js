import classNames from 'classnames';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Orderable from '../../../src/components/Orderable';
import React from 'react';
import Song from '../components/Song';
import styles from './Welcome.scss';

class Welcome extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    songs: ImmutablePropTypes.list.isRequired,
  };

  static defaultProps = {
    songs: Immutable.List([
      Immutable.Map({
        name: 'Sleep on the Floor',
        artist: 'The Lumineers',
        time: '3:31',
      }),
      Immutable.Map({
        name: 'Ophelia',
        artist: 'The Lumineers',
        time: '2:40',
      }),
      Immutable.Map({
        name: 'Cleopatra',
        artist: 'The Lumineers',
        time: '3:21',
      }),
      Immutable.Map({
        name: 'Gun Song',
        artist: 'The Lumineers',
        time: '3:36',
      }),
      Immutable.Map({
        name: 'Angela',
        artist: 'The Lumineers',
        time: '3:21',
      }),
    ]),
  };

  constructor(props) {
    super(props);

    const { songs } = props;
    this.state = {
      songs,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ids) {
    const { songs } = this.state;

    const songIndex = songs.reduce((result, song) => {
      return result.set(song.get('name'), song);
    }, Immutable.Map());

    this.setState({
      songs: Immutable.List(ids).map(id => songIndex.get(id)),
    });
  }

  render() {
    const { className } = this.props;
    const { songs } = this.state;

    return (
      <div className={classNames(styles.welcome, className)}>
        <div className={styles.links}>
          <a
            className={styles.link}
            href="http://www.clari.com"
          >
            <img
              className={styles.clariLogo}
              src={require('../img/logo.png')}
            />
          </a>
          <a
            className={styles.link}
            href="https://github.com/clariussystems/react-orderable"
          >
            <span className={classNames(styles.githubIcon, 'octicon', 'octicon-mark-github')} />
          </a>
        </div>
        <div className={styles.playlist}>
          <div className={styles.playlistHeader}>
            Playlist
          </div>
          <Orderable
            animated
            className={styles.songs}
            ghost
            itemSize={90}
            onChange={this.handleChange}
          >
            {songs.map(song => {
              return (
                <Song
                  className={styles.song}
                  id={song.get('name')}
                  key={song.get('name')}
                  song={song}
                />
              );
            })}
          </Orderable>
        </div>
      </div>
    );
  }
}

export default Welcome;
