import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import YouTube from 'react-youtube'
import { spring, Motion } from 'react-motion'
import AnimateHeight from 'react-animate-height'
import VisibilitySensor from 'react-visibility-sensor'
import { Icon } from 'react-fa'
import HeroPosts from './HeroPosts'
import { toggleSong } from './actions/queue'
import SongGrid from './SongGrid'
import Song from './Song'
import ShareBox from './ShareBox'
import FiltersBar from './FiltersBar'


class SongsContainer extends Component {
    constructor(props) {
        super(props)

        this.renderSongGrid = this.renderSongGrid.bind(this)
        this.renderSongList = this.renderSongList.bind(this)

        this.songs = {}

        this.state = {
            discoverFullSongIndex: 0
        }

        this.changeDiscoverSong = this.changeDiscoverSong.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.queue.isPlaying !== nextProps.queue.isPlaying ||
            this.props.queue.currentlyPlayingSong !== nextProps.queue.currentlyPlayingSong) {
        }

        console.log(this.props.discoverLayout)
    }

    changeDiscoverSong() {
        this.setState({ discoverFullSongIndex: this.state.discoverFullSongIndex + 1 })
    }

    renderSongGrid(song, index) {

        return (
            <SongGrid
                key={`${song.id}`}
                song={song}
            />
        )
    }
    renderSongList(song, index) {
        return (
            <Song
                key={`${song.id}`}
                song={song}
            />
        )
    }

    render() {
        const { discoverFullSongIndex } = this.state
        const heroPosts = this.props.posts.slice(0,7)

        // const songGrid = this.props.posts.slice(7).map(this.renderSongGrid)
        const songGrid = this.props.posts.slice(0,16).map(this.renderSongGrid)
        // const songList = this.props.posts.slice(7).map(this.renderSongList)
        const songList = this.props.posts.map(this.renderSongList)
        // const posts = this.props.posts.map(this.renderSong)

        return (
            <div className="songsContainer clearfix">
                <HeroPosts
                    posts={heroPosts}
                />
            <div id="discover" className="discovery-section">
              <FiltersBar />

              <div className={`discovery-container ${this.props.discoverLayout.previewScrollLayout ? 'previewScrollLayout' : ''} ${this.props.discoverLayout.fullGridLayout ? 'fullGridLayout' : ''}`}>
                <div className="songGrid">
                <button className="toggle-song previous" />
                  {songGrid}
                  <button className="toggle-song next" />
                </div>
                {/*<div className="songList">
                  {songList}
                </div>*/}

                <div className="discover-full-song">
                {this.props.posts[discoverFullSongIndex] &&
                    <Fragment>
                      <button className="toggle-song previous" onClick={() => this.changeDiscoverSong(true)}>
                            <img src='http://www.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                      </button>
                            <Song
                                song={this.props.posts[discoverFullSongIndex]}
                            />
                          <button className="toggle-song next" onClick={() => this.changeDiscoverSong(true)}>
                                <img src='http://www.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                          </button>
                    </Fragment>
                }

                </div>
              </div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    queue: state.posts,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleSong: postId => dispatch(toggleSong(postId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SongsContainer)
