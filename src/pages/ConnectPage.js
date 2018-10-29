import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SongsContainer from '../SongsContainer.js'
import { fetchPosts } from 'actions/index'
// import { fetchFeaturedPosts } from 'actions/featuredPosts'
import { fetchFilters } from 'actions/filters'
import { Helmet } from "react-helmet";
import Mailchimp from 'react-mailchimp-form'
import { Link } from 'react-router-dom'
import introImage from 'images/intro-bigger.png'
import diag2 from 'images/diagblue.png'
import logo1 from 'images/connect-logo.svg'
import logo2 from 'images/connect-logo.svg'
import gridPic from 'images/collage-full.png'
import line from 'images/gradient-line.png'
import tickets from 'images/tickets.svg'
import songs from 'images/songs.svg'
import pic1 from 'images/pic1.png'
import pic2 from 'images/pic2.png'
import pic3 from 'images/pic3.png'
import colorFull from 'images/connectColors.png'
import color1 from 'images/connectColors.png'
import colorIntroLong from 'images/connectColorsIntroLong.png'
import cross from 'images/cross.svg'
import logoWriting from 'images/logo-writing-black.png'
import blackLogo from 'images/rwt-head-black.png'





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


                <div className="middle">
                <img className="color bottomMiddle" src={color1} />

                  <div className="middle-content">
                    <img className="gridPic" src={gridPic} />
                    <div className="four-content">
                        <h3>
                          HUMAN RHYTHMS. <br/>
                          NOT ALGORITHMS. <br/>
                        </h3>

                      <p className="mission-tagline">
                      <b>{"Rock With This'"} mission is simple, to help you discover your new favorite songs.</b>
                      </p>
                      <hr />

                      <p className="email-text">Join us for daily songs, fresh playlists, and free tix to sold out shows!</p>

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

                  <img className="diagblue"src={diag2} />
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
