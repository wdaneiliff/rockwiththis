import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import YouTube from 'react-youtube'

class Media extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null

        this.toggleSong = this.toggleSong.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.post !== nextProps.post && this.props.post) {
            this.pause()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.post !== prevProps.post && this.props.isPlaying !== prevProps.isPlaying) {
            if (this.props.isPlaying) {
                this.play()
            } else {
                this.pause()
            }
        }
    }

    pause() {
      console.log('pause()')
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = this.props.post

        if (youtube_track_id) {
            const player = this.ytPlayer.internalPlayer
            player.pauseVideo()
        } else if (sc_track_id && window.SC) {
            window.SC.Widget('sc-player').pause()
        }
    }

    play() {
      console.log('play()')
      const {
          id,
          acf: {
              song_name,
              youtube_track_id,
              sc_track_id,
          },
      } = this.props.post

      if (youtube_track_id) {
          const player = this.ytPlayer.internalPlayer
          player.playVideo()
      } else if (sc_track_id && window.SC) {
          window.SC.Widget('sc-player').play()
      }
    }

    seek() {
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = this.props.post

        if (youtube_track_id) {
            const player = this.ytPlayer.internalPlayer
            // do something
        } else if (sc_track_id && window.SC) {
            // do something
        }
    }

    toggleSong() {
        const {
            id,
            acf: {
                song_name,
                youtube_track_id,
                sc_track_id,
            },
        } = this.props.post

        if (youtube_track_id) {
            const player = this.ytPlayer.internalPlayer
            player.playVideo()
        } else if (sc_track_id) {
            if (window.SC) {
                window.SC.Widget('sc-player').toggle()
            }
        }
    }

    render() {
        const {
            post,
        } = this.props

        let sc_track_id = null
        let youtube_track_id = null
        let song_name = null
        if (post) {
            sc_track_id = post.acf.sc_track_id
            youtube_track_id = post.acf.youtube_track_id
            song_name = post.acf.song_name
        }

        return (
            <div style={{ position: 'fixed', top: -500, width: 1000, height: 500 }}>
                <YouTube
                    id="yt-player"
                    ref={(ytPlayer) => { this.ytPlayer = ytPlayer }}
                    videoId={youtube_track_id || null}
                    onReady={() => {
                        if (this.props.post) {
                            this.play()
                        }
                    }}
                />
                <iframe
                    id="sc-player"
                    title="sc-player"
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    src={sc_track_id ? `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${sc_track_id}&auto_play=true` : ''}
                />
            </div>
        )
    }
}

Media.propTypes = {
    post: PropTypes.object,
}

Media.defaultProps = {
    post: null,
}

const mapStateToProps = (state, ownProps) => {
    const {
        isPlaying,
        currentlyPlayingSong,
    } = state.queue

    const post = currentlyPlayingSong ? state.posts.find(obj => obj.id === currentlyPlayingSong) : null

    return {
        isPlaying,
        post,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Media)
