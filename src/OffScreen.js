import React, { Component } from 'react'
import YouTube from 'react-youtube'

class OffScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            autoplay: true
        }
        this.bindPlayNext = this.bindPlayNext.bind(this)
        this.playNextSong = this.playNextSong.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const activeSong = this.props.activeSong
        const nextActiveSong = nextProps.activeSong
        if (this.props.isPlaying !== nextProps.isPlaying || activeSong !== nextActiveSong) {
            nextProps.isPlaying ? window.SC.Widget('sc-player').play() : window.SC.Widget('sc-player').pause()
        }
        if (activeSong && activeSong.id && activeSong !== nextActiveSong) {
            this.setState({ autoplay: true })
        }
    }

    bindPlayNext() {
        window.SC.Widget('sc-player').bind(window.SC.Widget.Events.FINISH, this.playNextSong)
    }

    playNextSong() {
        const activeSong = this.props.activeSong
        this.props.posts.find((post, i, arr) => {
            if (post === activeSong) {
                this.props.actions.toggleSong(arr[i + 1])
            }
        })
    }

    render() {
        const activeSong = this.props.activeSong
        return (
            <div className='iframe-and-youtube-wrapper'>
                <iframe
                    id="sc-player"
                    className="sc-player"
                    title={activeSong.acf && activeSong.acf.song_name}
                    width="100"
                    height="100"
                    scrolling="no"
                    frameBorder="no"
                    onLoad={this.bindPlayNext}
                    src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${activeSong && activeSong.acf.sc_track_id}?auto_play=${this.state.autoplay}`}
                />
                <YouTube
                    ref={(ytPlayer) => { this.ytPlayer = ytPlayer }}
                    videoId={activeSong && activeSong.youtube_track_id}
                    id="yt-player"
                    onEnd={() => this.props.playNextSong()}
                />
            </div>
        )
    }
}

export default OffScreen
