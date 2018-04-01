import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
            setTimeout(() => window.SC.Widget('sc-player').play(), 300)
        }
    }

    componentDidUpdate() {

    }

    render() {
        const { currentlyPlayingSong } = this.props
        return (
            <div className='iframe-and-youtube-wrapper'>
                <iframe
                    id="sc-player"
                    className="sc-player"
                    title={currentlyPlayingSong && currentlyPlayingSong.acf.song_name}
                    scrolling="no"
                    frameBorder="no"
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentlyPlayingSong && currentlyPlayingSong.acf.sc_track_id}`}
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
