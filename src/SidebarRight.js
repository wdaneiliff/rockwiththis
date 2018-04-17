import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SubscribeFrom from 'react-mailchimp-subscribe'

class SidebarRight extends Component {
    renderFeaturedSong(song, index) {
        return (
            <div className="songContainer" key={index}>
              <div className="songImageContainer">
                <img alt="songImage" className="songImage" src={song.better_featured_image.source_url} />
              </div>

                <div className="songInfo">
                  <Link className="songImageLink" to={`/songs/${song.id}`}>
                    <span className="songName">{song.acf.song_name}</span> <br />
                  </Link>
                    <span className="artistName">{song.acf.artist_name}</span>
                </div>
            </div>
        )
    }
    render() {
        const formProps = {
            action: 'https://rockwiththis.us17.list-manage.com/subscribe/post?u=bfac2b1c3906a8dba6db52ab1&amp;id=ddc17b51d2" method="post" id="mc-embedded-subscribe-form',
            messages: {
                inputPlaceholder: 'Your email here',
                btnLabel: 'Sign Up',
                sending: 'Sending',
                success: 'Thanks!',
                error: 'Woops... something went wrong.'
            },
            styles: {
                sending: {
                    fontSize: 18,
                    color: 'auto'
                },
                success: {
                    fontSize: 18,
                    color: 'green'
                },
                error: {
                    fontSize: 18,
                    color: 'red'
                }
            }
        }
        const featuredPosts = this.props.featuredPosts.map(this.renderFeaturedSong)
        return (
            <div className="sidebarRight">
              <div className="newsletterContainer">
                <SubscribeFrom {...formProps} />
                  <div className="socialLinks">
        				<a target="_blank" href="https://www.facebook.com/rockwiththis/"><img src="http://rockwiththis.com/wp-content/uploads/2018/03/facebook-black.png"/></a>
        				<a target="_blank" href="https://www.instagram.com/rockwiththismusic/"><img src="http://rockwiththis.com/wp-content/uploads/2018/03/instagram-black.png"/></a>
        				<a target="_blank" href="https://open.spotify.com/user/jaredp21/playlist/2eWK5PGSTEl8I5ZvMG5VPS"><img src="http://rockwiththis.com/wp-content/uploads/2018/03/spotify-black.png"/></a>
                <a target="_blank" href="https://soundcloud.com/rockwiththis/sets/rock-with-this"><img src="http://rockwiththis.com/wp-content/uploads/2018/03/soundcloud-black.png"/></a>

        			</div>
                  <h3>HUMAN RHYTHMS. NOT ALGORITHMS</h3>
                  <div className="mission">
                    <p>Our mission is simple, to help you <b>discover</b> your new <b>favorite songs</b>. We deliver the best of what's <b>breaking</b> and uncover the <b>left-behind</b> tracks that need to be heard. <b>One song a day</b>, hopefully that you haven't heard, but will <b>love</b>.</p>
                  </div>

              </div>
                <div className="topTrackContainer">
                    <h3>TRENDING TRACKS<i className="fa fa-question-circle tooltip" aria-hidden="true"><span className="tooltiptext">Dive a bit deeper. Explore top tracks we've featured in the past.</span></i></h3>
                    {featuredPosts}
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    featuredPosts: state.featuredPosts,
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SidebarRight)
