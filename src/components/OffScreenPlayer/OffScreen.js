import React from 'react'
import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'

class OffScreen extends React.Component {
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
            // nextProps.isPlaying ? window.SC.Widget('sc-player').play() : window.SC.Widget('sc-player').pause()
        }
        if (activeSong && activeSong.id && activeSong !== nextActiveSong) {
            this.setState({ autoplay: true })
        }
    }

    bindPlayNext() {
        // window.SC.Widget('sc-player').bind(window.SC.Widget.Events.FINISH, this.playNextSong)
    }

    playNextSong() {
        const activeSong = this.props.activeSong
        this.props.posts.find((post, i, arr) => {
            if (post.id === activeSong.id) {
                this.props.actions.toggleSong(arr[i + 1])
            }
        })
    }



    render() {
        const activeSong = this.props.activeSong
        const url = activeSong.soundcloud_track_id ? `https%3A//api.soundcloud.com/tracks/${activeSong.soundcloud_track_id}` : activeSong.youtube_link
        const setSongDuration = (ref) => {
          this.props.actions.setSongDuration(ref.getDuration())
        }
        return (
            <div className='iframe-and-youtube-wrapper'>
                <ReactPlayer
                    playing={this.props.isPlaying}
                    onReady={setSongDuration}
                    onProgress={this.props.actions.setSongProgress}
                    onEnded={this.props.changeSongOnEnd}
                    url={url}
                    ref={(e) => {
                      this.player = e;
                    }}
                />
            </div>
        )
    }
}

export default OffScreen
