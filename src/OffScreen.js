import React, { Component } from 'react'
import YouTube from 'react-youtube'

class OffScreen extends Component {
    static getCurrentlyPlayingSong(posts, queue) {
        return posts.find(post => post.id === queue.currentlyPlayingSong) || posts[0]
    }

    constructor(props) {
        super(props)
        this.state = {
            autoplay: true
        }
        this.bindPlayNext = this.bindPlayNext.bind(this)
        this.playNextSong = this.playNextSong.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const thisCurrentlyPlayingSong = OffScreen.getCurrentlyPlayingSong(this.props.posts, this.props.queue)
        const nextCurrentlyPlayingSong = OffScreen.getCurrentlyPlayingSong(nextProps.posts, nextProps.queue)
        if (this.props.queue.isPlaying !== nextProps.queue.isPlaying || thisCurrentlyPlayingSong !== nextCurrentlyPlayingSong) {
            nextProps.queue.isPlaying ? window.SC.Widget('sc-player').play() : window.SC.Widget('sc-player').pause()
        }
        if (thisCurrentlyPlayingSong && thisCurrentlyPlayingSong.id && thisCurrentlyPlayingSong !== nextCurrentlyPlayingSong) {
            this.setState({ autoplay: true })
        }
    }

    bindPlayNext() {
        window.SC.Widget('sc-player').bind(window.SC.Widget.Events.FINISH, this.playNextSong)
    }

    playNextSong() {
        const thisCurrentlyPlayingSong = OffScreen.getCurrentlyPlayingSong(this.props.posts, this.props.queue)
        this.props.posts.find((post, i, arr) => {
            if (post === thisCurrentlyPlayingSong) {
                this.props.actions.toggleSong(arr[i + 1].id)
            }
        })
    }

    render() {
        const currentlyPlayingSong = OffScreen.getCurrentlyPlayingSong(this.props.posts, this.props.queue)
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
                    onLoad={this.bindPlayNext}
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

export default OffScreen
