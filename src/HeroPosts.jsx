import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Song from './Song'
import SingleSong from './SingleSong'
import HeroSong from './HeroSong'
import hoverGradient from './images/rwt-hover-gradient.png'




class HeroPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollPercentage: 0,
            loading: true,
        }
    }

    componentWillMount() {
      const callback = () => {
        this.setState({
          loading: false,
        })
      }
    }

    render() {
        const placeholderSong = {
            better_featured_image: 'string',
            date: moment(),
            acf: {
                song_name: 'Loading (feat. Slow App)',
                artist_name: 'React'
            },
            content: {
              rendered: 'Loading Description...'
            },
            _embedded: {
              'wp:term': [
                {name: "tag"},
                {name:"tag"}
              ]
            }
        }

        const trackDisplay = (post, i, isSmall) => {
            const image = post.better_featured_image.source_url
            const month = moment(post.date).format('MMM')
            const date = moment(post.date).format('D')
            const title = post.acf.song_name
            const artist = post.acf.artist_name
            return (
                  <div className={`${isSmall ? 'less-' : ''}featured-track-wrapper index-${i}`} key={post.id}>
                      <div className='feature-track'>
                          <Link className='move-back-link' to={`/songs/${post.id}`}>
                          <img className="heroHoverGradient" src={hoverGradient} />

                              <img src={image} />
                          </Link>
                          <div className="post-info">
                          {!isSmall && <span className="song-of-day-tag">Song of the day</span>}
                              <HeroSong {...this.props} song={post} />
                              <Link className='move-back-link' to={`/songs/${post.id}`}>
                                <div className="song-info">
                                    <p className="song-title">{title}</p>
                                    <p className="song-artist">{artist}</p>
                                </div>
                                <div className="post-square-wrapper date">
                                    <div className='post-date'>
                                        <p className="month">{month}</p>
                                        <p className="day">{date}</p>
                                    </div>
                                </div>
                              </Link>
                          </div>
                      </div>
                  </div>
            )
        }
        const { heroPosts } = this.props || [placeholderSong,placeholderSong,placeholderSong,placeholderSong,placeholderSong,placeholderSong,placeholderSong]
        const featuredPostArg = heroPosts[0] || placeholderSong
        const featuredPost = trackDisplay(featuredPostArg, false)
        const otherPosts = heroPosts.slice(1).map((post, i) => trackDisplay(post, i, true))

        return (
            <div>
                <div id="hero-post" className='hero-posts' ref={node => this.postsWrapper = node}>
                    {featuredPost}
                    <div className='previous-week'>
                        {otherPosts}
                    </div>
                </div>
            </div>
        )
    }
}

export default HeroPosts
