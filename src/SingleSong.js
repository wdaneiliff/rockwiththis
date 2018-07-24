import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import AnimateHeight from 'react-animate-height'
import { Icon } from 'react-fa'
import YouTube from 'react-youtube'
import { toggleSong, togglePlayPause } from './actions/queue'
import ShareBox from './ShareBox'
import { Helmet } from "react-helmet";


class SingleSong extends Component {
    constructor(props) {
        super(props)

        this.ytPlayer = null

        this.toggleDescription = this.toggleDescription.bind(this)

        this.state = {
            expanded: false
        }
        this.updateStorePlayPause = this.updateStorePlayPause.bind(this)
    }

    onPressPlay(song) {
        this.updateStorePlayPause(song.id !== this.props.activeSong.id)
        this.props.actions.toggleSong(song)
    }

    updateStorePlayPause(newSong) {
        this.props.actions.togglePlayPause(newSong ? true : !this.props.isPlaying)
    }

    toggleDescription() {
        const { height } = this.state

        this.setState({
            expanded: !this.state.expanded
        })
    }

    renderTags() {
        const {
            song,
        } = this.props

        const tags = song._embedded['wp:term'][1].map(tag =>
            <span key={tag.name} className="tag" dangerouslySetInnerHTML={{ __html: tag.name }} />)

        return (
            <span className="postTags">
                {tags}
            </span>
        )
    }


    renderPlayer() {
        const {
            activeSong,
            isPlaying,
        } = this.props
        const song = this.props.singleSong
        const playPauseButton = song.id === activeSong.id && isPlaying ? (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/05/16427.png" className="pauseButton" />
        ) : (
            <img src="http://www.rockwiththis.com/wp-content/uploads/2018/04/unnamed.png" className="playButton" />
        )


        return (
          <div className='player-button'>
            <button
                className="singlePostPlayerButton"
                onClick={() => this.onPressPlay(song)}
            >
                {playPauseButton}
            </button>
          </div>
        )
    }

    renderDescription() {
        const song = this.props.singleSong
        return (
              <div className={`bottomContentContainer ${this.state.expanded ? 'expanded' : ''}`}>
                  <p className="songDescription" dangerouslySetInnerHTML={{ __html: song.content.rendered }} />
              </div>
        )
    }

    render() {
        const {
            activeSong,
            isPlaying,
        } = this.props
        const song = this.props.singleSong

        const { height } = this.state
        const songTagsMeta = song.pure_taxonomies.tags.map(tag => {
          return (<meta name="tag" content={tag.name} />)
        })
        const songTags = song.pure_taxonomies.tags.map(tag => {
          return (
            <span className="postTags">
              <span key={tag.id} className="tag">{tag.name}</span>
            </span>
          )
        })
        return (
            <div id={song.slug} className="songContainer" key={`${song.id}`}>
            <Helmet>
              <title>Rock With This - {song.acf.song_name} by {song.acf.artist_name}</title>
              <meta name="song" content={song.acf.song_name} />
              <meta name="artist" content={song.acf.artist_name} />
              <meta name="description" content={song.content.rendered} />
              <meta name="og:image" content={song.better_featured_image.source_url} />
              {songTagsMeta}
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>
            <div className="wrapper">
                <div className="imageContainer">
                  <img className="songImage" src={song.better_featured_image.source_url} />
                  <div className="songImageInfoContainer">
                  {this.renderPlayer()}
                    <div className="song-info">
                        <p className="song-title">{song.acf.song_name}</p>
                        <p className="song-artist">{song.acf.artist_name}</p>
                    </div>
                    <div className="shareContainer">
                      <ShareBox props={song.slug} />
                    </div>
                  </div>
                </div>
                <div className="postContent" >

                <div>
                    <div className="songInfo">
                    <div className="topSection">
                    {this.renderPlayer()}
                    <div className="singleSongInfo">
                        <span className="songName">{song.acf.song_name}</span><br />
                        <span className="artistName">{song.acf.artist_name}</span>
                    </div>
                    </div>
                        <p className="metaInfo">
                        <p className="leftInfo desktop">
                        <span className="postDate "><Moment format="ll" date={song.date} /> | <span className="postAuthor">Jared Paul</span> | </span>
                        </p>
                        <p className="leftInfo mobile">
                        <span className="postDate "><Moment format="d/M/YY" date={song.date} /> | <span className="postAuthor">Jared Paul</span> | </span>
                        </p>
                            {songTags}
                            <a href="#" className="spotify"><i className="fa fa-spotify" aria-hidden="true" /></a>
                        </p>
                        <span className="ss-sharebox-desktop"><ShareBox props={song.slug} /></span>



                    </div>
                </div>
                    {this.renderDescription()}
                </div>
            </div>
          </div>
        )
    }
}

SingleSong.propTypes = {
    song: PropTypes.object.isRequired,
    toggleSong: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    activeSong: PropTypes.object,
}

SingleSong.defaultProps = {
    activeSong: {},
}

export default SingleSong
