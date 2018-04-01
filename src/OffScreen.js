import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import YouTube from 'react-youtube'

class OffScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            autoplay: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isPlaying !== nextProps.isPlaying || this.props.currentlyPlayingSong !== nextProps.currentlyPlayingSong) {
            nextProps.isPlaying ? window.SC.Widget('sc-player').play() : window.SC.Widget('sc-player').pause()
        }

        if (this.props.currentlyPlayingSong && this.props.currentlyPlayingSong.id && nextProps.currentlyPlayingSong !== this.props.currentlyPlayingSong) {
            this.setState({ autoplay: true })
        }
    }

    render() {
        const { currentlyPlayingSong } = this.props
        return (
            <div className='iframe-and-youtube-wrapper'>
                <iframe
                    id="sc-player"
                    className="sc-player"
                    title={currentlyPlayingSong && currentlyPlayingSong.acf.song_name}
                    width="100"
                    height="100"
                    scrolling="no"
                    frameBorder="no"
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentlyPlayingSong && currentlyPlayingSong.acf.sc_track_id}?auto_play=${this.state.autoplay}`}
                />
                <YouTube
                    ref={(ytPlayer) => { this.ytPlayer = ytPlayer }}
                    videoId={currentlyPlayingSong && currentlyPlayingSong.youtube_track_id}
                    id="yt-player"
                    onEnd={() => this.props.playNextSong()}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let currentlyPlayingSong = state.posts.find(post => post.id === state.queue.currentlyPlayingSong)
    if (!currentlyPlayingSong) {
        currentlyPlayingSong = state.posts[0]
    }
    return {
        currentlyPlayingSong,
        isPlaying: state.queue.isPlaying,
    }
}

export default connect(mapStateToProps, null)(OffScreen);
