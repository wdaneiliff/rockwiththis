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
import hands1 from './images/hands.svg'







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
          <div className="submitSongPage page">
            <div className="left-content">
            <h3>SHOW US <br />WHAT YOU GOT.</h3>
            <hr />
            <p>Want your song shared with tens of thousands of people all over the world?  Send us the song info, your email and a link for us to check it out. If we dig it, we’ll post the song and a detailed writeup on our social channels, website, and on our email newsletter.  If we don't, we'll still give you some feedback. It could be the best $5 {"you've"} ever spent. </p>
            </div>

            <img className="hands1" src={hands1} />
          </div>

           </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

export default connect(mapStateToProps)(SubmitSongPage)
