import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SongsContainer from './SongsContainer.js'
import SocialLinks from './SocialLinks.js'
import { fetchPosts } from './actions/index'
import { fetchFeaturedPosts } from './actions/featuredPosts'
import { fetchFilters } from './actions/filters'
import { Helmet } from "react-helmet";
import Mailchimp from 'react-mailchimp-form'
import { Link } from 'react-router-dom'
import introImage from './images/intro-bigger.png'
import diag2 from './images/diagblue.png'
import diagcover from './images/diagcoversharp.png'
import logo1 from './images/connect-logo.svg'
import logo2 from './images/connect-logo.svg'
import gridPic from './images/collage-full.png'
import line from './images/gradient-line.png'
import tickets from './images/tickets.svg'
import songs from './images/songs.svg'
import pic1 from './images/pic1.png'
import pic2 from './images/pic2.png'
import pic3 from './images/pic3.png'
import colorFull from './images/connectColorsFull.png'
import colorTop from './images/connectColorsTop.png'
import colorBottom from './images/connectColorsBottom.png'
import colorIntroLong from './images/connectColorsIntroLong.png'
import cross from './images/cross.svg'





class ConnectPage extends Component {
    constructor(props) {
        super(props)

    }

    render() {

      const url = "https://rockwiththis.us17.list-manage.com/subscribe/post?u=bfac2b1c3906a8dba6db52ab1&amp;id=ddc17b51d2";

      const songGrid = this.props.filteredPosts.slice(0,16).map((song, index) => {
        return (
            <div className="songContainer" key={index}>
                <Link className="songImageLink" to={`/songs/${song.id}`}>
                    <img alt="songImage" className="songImage" src={song.better_featured_image && song.better_featured_image.source_url} />
                </Link>
            </div>
        )
      })


        return (
          <div>
          <Helmet>
            <title>Rock With This - Your New Favorite Song</title>
          </Helmet>
             <div className="connectPage">
             <div className="intro">
                <div className="missionContainer ">
                  <div className="content">
                    <h3>HUMAN RHYTHMS <br/>
                    NOT ALGORITHMS
                    </h3>
                    <p><i><b>Rock With This’ mission is simple, to help you discover your new favorite songs.</b></i> Our team consists of huge music lovers who spend hours each day digging through tracks, to deliver the best of what’s breaking and uncover the left behind tracks that need to be heard. Our goal is for people to have heard less than 20% of the tracks and to love 80% or more. </p>
                  </div>
                </div>
                <div className="emailContainer ">

                    <div className="email">
                    <img className="email-logo" src={logo1} />
                    <p>Join us for daily songs, fresh playlists, and free tix to sold out shows. </p>


                    <Mailchimp
                        action='https://rockwiththis.us17.list-manage.com/subscribe/post?u=bfac2b1c3906a8dba6db52ab1&amp;id=ddc17b51d2'
                        fields={[
                          {
                            name: 'EMAIL',
                            placeholder: 'Email',
                            type: 'email',
                            required: true
                          }
                        ]}

                        className='rwt-email-form'
                      />
                    </div>

                </div>
                <img className="intro-pic pic1" src={pic1} />
                <img className="intro-pic pic2" src={pic2} />
                <img className="intro-pic pic3" src={pic3} />
                <img className="intro1Image" src={introImage} />
                <img className="logo1" src={logo1} />
                <img className="color top" src={colorTop} />
                <img className="colorbottom2" src={colorIntroLong} />
                </div>


                <div className="middle">
                <img className="color bottomMiddle" src={colorBottom} />

                  <div className="middle-content">
                    <img className="gridPic" src={gridPic} />
                    <div className="four-content">

                      <h3>
                      MUSIC <br/>
                      INSIGHT <br/>
                      ART <br/>
                      DESIGN <br/>
                      </h3>
                      <img className="cross" src={cross} />
                      <p>
                        We want to not only be the best sounding website in the world, but the best looking. We believe music inspires art and vice versa. Cover art is getting more sick by the day and we seek to highlight the best of what’s being designed.
                      </p>

                    </div>
                  </div>

                  <img className="diagblue"src={diag2} />
                  <img className="diagblue cover"src={diagcover} />
                  <img className="logo2" src={logo1} />
                  <img className="color2" src={colorFull} />


                </div>

              </div>





           </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

export default connect(mapStateToProps)(ConnectPage)
