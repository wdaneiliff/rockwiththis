import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import Moment from 'react-moment'
import { Icon } from 'react-fa'
import styles from './SongsContainer.css'

class SongsContainer extends Component {
    toggleDescription() {
        $('.bottomContentContainer').toggleClass('collapsed')
    }


    render() {
        const posts = this.props.posts.map((song, index) => (
            <div className="songContainer" key={index}>
                <div className="imageContainer">
                    <img className="songImage" src={song._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} />
                </div>
                <div className="postContent" >
                    <div className="topContentContainer">
                        <div className="songInfo">
                            <p className="postTitle" dangerouslySetInnerHTML={{ __html: song.title.rendered }} />
                            <p className="metaInfo"><span className="postAuthor">By {song._embedded.author[0].name}</span> | <span className="postDate"><Moment format={'ll'} date={song.date} /></span></p>
                        </div>
                    </div>
                    <div className="singlePostPlayer">
                        <button className="singlePostPlayerButton" />
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
            </div>
        ))
        return (
            <div className="songsContainer">
                {posts}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SongsContainer)
