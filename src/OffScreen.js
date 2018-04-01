import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class OffScreen extends Component {
    render() {
        return (
            <div className='iframe-and-youtube-wrapper'>
                <iframe
                    id="sc-player"
                    title={this.props.currentlyPlayingSong && this.props.currentlyPlayingSong.acf.song_name}
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.props.currentlyPlayingSong && this.props.currentlyPlayingSong.acf.sc_track_id}?auto_play=${this.props.isPlaying}`}
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
