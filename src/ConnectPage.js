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



class ConnectPage extends Component {
    constructor(props) {
        super(props)

    }

    render() {

      const url = "https://rockwiththis.us17.list-manage.com/subscribe/post?u=bfac2b1c3906a8dba6db52ab1&amp;id=ddc17b51d2";


        return (
          <div>
          <Helmet>
            <title>Rock With This - Your New Favorite Song</title>
          </Helmet>
             <div className="connectPage">
                <div className="missionContainer half">
                  <div className="content">
                    <h3>HUMAN RHYTHMS. NOT ALGORITHMS</h3>
                    <p>Our mission is simple, to help you discover your new favorite songs. Our goal is to become the most trusted source of curated music in the world by delivering the best of what's breaking and uncover the left behind tracks that need to be heard.
                    <br/>
                    We post one song a day, hopefully you haven’t heard, but will love.

                    Our team consists of huge music lovers who spend hours each day digging through tracks to uncover old and new gems. While dance music inspired us to create this site, we won't hesitate to post songs from any genre if we feel you'll dig it.
                    <br/>
                    RWT believes in the power of music. We believe music is often the foundation for memorable moments in our lives...hanging with friends and family, epic road trips, a simple day at the beach, and life's most important celebrations. Rock With This hopes to make those times a bit more memorable.

                    Rock on and Rock With This.</p>
                  </div>
                </div>
                <div className="emailContainer half">
                    <div className="content">
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
              </div>

           </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => Object.assign(state, ownProps)

export default connect(mapStateToProps)(ConnectPage)
