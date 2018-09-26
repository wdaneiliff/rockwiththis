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
import logoWriting from './images/logo-writing-black.png'





class SubmitSongPage extends Component {
    constructor(props) {
        super(props)

    }

    render() {


        return (
          <div>
          <Helmet>
            <title>Rock With This - Your New Favorite Song</title>
          </Helmet>

           </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

export default connect(mapStateToProps)(SubmitSongPage)
