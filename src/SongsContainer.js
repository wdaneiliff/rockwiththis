import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import Moment from 'react-moment'
import YouTube from 'react-youtube'
import { Icon } from 'react-fa'
import styles from './SongsContainer.css'
import { toggleSong } from './actions/queue'

class SongsContainer extends Component {
    constructor(props) {
        super(props)

        this.renderSong = this.renderSong.bind(this)

        this.ytPlayers = {}
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.queue.isPlaying !== nextProps.queue.isPlaying ||
            this.props.queue.currentlyPlayingSong !== nextProps.queue.currentlyPlayingSong) {

            // if not playing anymore, then pause current song
            // if new song, then stop last song and start next song
        }
    }

    onPressPlay(song) {
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = song

        if (youtube_track_id) {
            const player = this.ytPlayers[youtube_track_id].internalPlayer
            player.playVideo()
        } else if (sc_track_id) {
            if (window.SC) {
                window.SC.Widget(`sc-${sc_track_id}`).toggle()
            }
        }

        this.props.toggleSong(id)
    }

    toggleDescription() {
        $('.bottomContentContainer').toggleClass('collapsed')
    }

    renderTags(song) {
        const tags = song._embedded['wp:term'][1].map(tag =>
            <span className="tag" dangerouslySetInnerHTML={{ __html: tag.name }} />)
        return (
            <span className="postTags">
                {tags}
            </span>
        )
    }

    renderMedia(song) {
        const {
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = song

        if (youtube_track_id) {
            return (
                <div style={{ position: 'absolute', top: -500 }}>
                    <YouTube
                        ref={(ytPlayer) => { this.ytPlayers[youtube_track_id] = ytPlayer }}
                        videoId={youtube_track_id}
                        id={`yt-${youtube_track_id}`}
                    />
                </div>
            )
        } else if (sc_track_id) {
            return (
                <div style={{ position: 'absolute', top: -500 }}>
                    <iframe
                        id={`sc-${sc_track_id}`}
                        title={song_name}
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${sc_track_id}`}
                    />
                </div>
            )
        } else {
            return null
        }
    }

    renderSong(song, index) {
        return (
            <div className="songContainer" key={index}>
                <div className="imageContainer">
                    <img className="songImage" src={song._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} />
                </div>
                <div className="postContent" >
                    <div className="topContentContainer">
                        <div className="songInfo">
                            <p className="postTitle" dangerouslySetInnerHTML={{ __html: song.title.rendered }} />
                            <p className="metaInfo"><span className="postAuthor">By {song._embedded.author[0].name}</span> | <span className="postDate"><Moment format="ll" date={song.date} /> | </span>
                                {this.renderTags(song)}
                            </p>
                        </div>
                    </div>
                    <div className="singlePostPlayer">
                        <button
                            className="singlePostPlayerButton"
                            onClick={() => this.onPressPlay(song)}
                        />
                        <div className="singlePostPlayerInfo">
                            <p className="songName">{song.acf.song_name}</p>
                            <p className="artistName"><span className="by">by</span>{song.acf.artist_name}</p>
                        </div>
                    </div>
                    <div className="bottomContentContainer collapsed">
                        <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
                    </div>
                    <p onClick={this.toggleDescription} className="expand">More<br /> <Icon name="angle-down" /></p>
                </div>
                {this.renderMedia(song)}
            </div>
        )
    }

    render() {
        const posts = this.props.posts.map(this.renderSong)
        return (
            <div className="songsContainer">
                {posts}
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
