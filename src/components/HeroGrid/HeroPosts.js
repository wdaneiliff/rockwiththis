import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import HeroSong from './HeroSong'
import hoverGradient from 'images/rwt-hover-gradient.png'
import HeroPostsPlaceholder from 'components/HeroGridPlaceholder/HeroGridPlaceholder'


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
      console.log(this.props)
        const { heroPosts } = this.props

        const trackDisplay = (post, i, isSmall) => {
            const image = post.better_featured_image.source_url
            // const month = moment(post.date).format('MMM')
            const date = moment(post.date).format('D')
            const day = moment(post.date).format('ddd');
            const title = post.acf.song_name
            const artist = post.acf.artist_name
            const tags = post._embedded['wp:term'][1].map(tag =>
                <span key={tag.name} className="hero-tag">#{tag.name}</span>)

            return (
                  <div className={`${isSmall ? 'less-' : ''}featured-track-wrapper index-${i}`} key={post.id}>
                      <div className='feature-track'>
                          <Link className='move-back-link' to={`/songs/${post.id}`}>
                          <div className="hover-content">
                            <div className="tagWrapper">
                              {tags}
                            </div>
                            <p className="goToPage">
                              Read More
                            </p>
                          </div>


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
                                        <p className="month">{day}</p>
                                        <p className="day">{date}</p>
                                    </div>
                                </div>
                              </Link>
                          </div>
                      </div>
                  </div>
            )
        }
        const featuredPostArg = heroPosts.length > 0 && heroPosts[0]
        const featuredPost = featuredPostArg && trackDisplay(featuredPostArg, false)
        const otherPosts = heroPosts.slice(1).map((post, i) => trackDisplay(post, i, true))

        return (
            <div>
                <div id="hero-post" className='hero-posts' ref={node => this.postsWrapper = node}>
                  {heroPosts.length > 0 ?
                    <Fragment>
                      {featuredPost}
                      <div className='previous-week'>
                          {otherPosts}
                      </div>
                    </Fragment>
                    :
                    <HeroPostsPlaceholder/>
                  }
                </div>
            </div>
        )
    }
}

export default HeroPosts
