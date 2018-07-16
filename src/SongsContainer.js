import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
import { Icon } from 'react-fa'
import { Element } from 'react-scroll'
import HeroPosts from './HeroPosts'
import SongGrid from './SongGrid'
import Song from './Song'
import ShareBox from './ShareBox'
import FiltersBar from './FiltersBar'

class SongsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          discoverFullSongIndex: 0
        }

        this.changeDiscoverSong = this.changeDiscoverSong.bind(this)
        this.updateDiscoverFullSongIndex = this.updateDiscoverFullSongIndex.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isPlaying !== nextProps.isPlaying ||
            this.props.activeSong !== nextProps.activeSong) {
        }
    }

    changeDiscoverSong(increment) {
        const newIndex = increment ? this.state.discoverFullSongIndex + 1 :
          this.state.discoverFullSongIndex - 1
        this.setState({ discoverFullSongIndex: newIndex })
    }

    updateDiscoverFullSongIndex(e) {
        this.setState({
            discoverFullSongIndex: Number(e.currentTarget.dataset.index)
        })
    }

    renderSongList(song, index) {
        return (
            <Song
                {...this.props}
                key={`${song.id}`}
                song={song}
            />
        )
    }

    render() {
        const { discoverFullSongIndex } = this.state
        const heroPosts = this.props.posts.slice(0,7)
        const songGrid = this.props.filteredPosts.slice(0,16).map((song, index) => {
          return (
              <SongGrid
                  {...this.props}
                  index={index}
                  activeDiscoverFullSong={discoverFullSongIndex === index}
                  updateDiscoverFullSongIndex={this.updateDiscoverFullSongIndex}
                  key={song.id}
                  song={song}
              />
          )
        })
        const songList = this.props.filteredPosts.map((song, index) => {
          return(
            <Song
                {...this.props}
                key={`${song.id}`}
                song={song}
            />
          )
        })

        return (
            <div className="songsContainer clearfix">
                <HeroPosts
                    {...this.props}
                    heroPosts={heroPosts}
                />
              <div id="discover" className="discovery-section">
                <Element name='discoverySectionScroll'>
                  <FiltersBar {...this.props} />
                </Element>
                <div className={`discovery-container ${this.props.discoverLayout === 'snapshot' ? 'previewScrollLayout' : ''} ${this.props.discoverLayout === 'fullGrid' ? 'fullGridLayout' : ''}`}>
                  {this.props.discoverLayout !== 'snapshot' &&
                    <div className="songGrid">
                      <button className="toggle-song previous" />
                        {songGrid}
                      <button className="toggle-song next" />
                    </div>}
                  <div className="songList">
                    {songList}
                  </div>

                  {this.props.discoverLayout !== 'snapshot' &&
                    <div className="discover-full-song">
                      {this.props.filteredPosts[discoverFullSongIndex] &&
                          <Fragment>
                            <button className="toggle-song previous" onClick={() => this.changeDiscoverSong(false)}>
                                  <img src='http://www.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                            </button>
                                  <Song
                                      song={this.props.filteredPosts[discoverFullSongIndex]}
                                  />
                                <button className="toggle-song next" onClick={() => this.changeDiscoverSong(true)}>
                                      <img src='http://www.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                                </button>
                          </Fragment>
                      }
                      </div>
                    }
                </div>

              </div>
            </div>
        )
    }
}

export default SongsContainer
