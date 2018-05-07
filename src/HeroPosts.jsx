import React, { Fragment } from 'react'
import moment from 'moment'
import Song from './Song'

class HeroPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollPercentage: 0,
        }
    }

    render() {
        const placeholderSong = {
            better_featured_image: 'string',
            date: moment(),
            acf: {
                song_name: 'Loading (feat. Slow App)',
                artist_name: 'React'
            }
        }

        const trackDisplay = (post, i, isSmall) => {
            const image = post.better_featured_image.source_url
            const month = moment(post.date).format('MMM')
            const date = moment(post.date).format('D')
            const title = post.acf.song_name
            const artist = post.acf.artist_name
            return (
                <div className={`${isSmall ? 'less-' : ''}featured-track-wrapper index-${i}`}>
                    <div className='feature-track'>
                        <img src={image} />
                        
                        <div className="post-info">
                        {!isSmall && <span className="song-of-day-tag">Song of the day</span>}
                            <div className="post-square-wrapper date">
                                <div className='post-date'>
                                    <p className="month">{month}</p>
                                    <p className="day">{date}</p>
                                </div>
                            </div>
                            <div className="song-info">
                                <p className="song-title">{title}</p>
                                <p className="song-artist">{artist}</p>
                            </div>
                            <div className='post-square-wrapper play'>
                                <img src="http://www.rockwiththis.com/wp-content/uploads/2018/04/unnamed.png" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        const { posts } = this.props || [placeholderSong,placeholderSong,placeholderSong,placeholderSong,placeholderSong,placeholderSong,placeholderSong]
        const featuredPostArg = posts[0] || placeholderSong
        const featuredPost = trackDisplay(featuredPostArg, false)

        const otherPosts = posts.slice(1).map((post, i) => trackDisplay(post, i, true))

        return (
            <div>
                <div className='hero-posts' ref={node => this.postsWrapper = node}>
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
