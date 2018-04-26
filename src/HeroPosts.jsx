import React from 'react'
import moment from 'moment'
import Song from './Song'

class HeroPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

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
        const { posts } = this.props
        const featuredPost = posts[0] || placeholderSong
        const featuredImage = featuredPost.better_featured_image.source_url
        const featuredMonth = moment(featuredPost.date).format('MMM')
        const featuredDate = moment(featuredPost.date).format('D')
        const featuredTitle = featuredPost.acf.song_name
        const featuredArtist = featuredPost.acf.artist_name
        const otherPosts = this.props.posts.slice(6)

        const previousWeekPosts = otherPosts.map((post) => {
          <div className='feature-post small'>
            <img src="https://www.rockwiththis.com/wp-admin/upload.php?item=12679" />
          </div>
        })

        return (
            <div>
                <div className='hero-posts'>
                    <div className='featured-track'>
                      <div className='feature-post large'>
                        <img src={featuredImage} />
                        <span className="song-of-day-tag">Song of the day</span>
                        <div className="post-info">
                        <span className="post-date"><span className="month">{featuredMonth}</span><br /><span className="day">{featuredDate}</span></span>
                        <p className="song-info">
                        <span className="song-title">{featuredTitle}</span><br/>
                        <span className="song-artist">{featuredArtist}</span>
                        </p>
                        <img className="play-button" src="http://www.rockwiththis.com/wp-content/uploads/2018/04/unnamed.png" />
                        </div>
                      </div>
                    </div>
                    <div className='previous-week'>
                      <div className='feature-post small'>
                        <img src="http://www.rockwiththis.com/wp-content/uploads/2018/01/Daydream.png" />
                      </div>
                      <div className='feature-post small'>
                        <img src="http://www.rockwiththis.com/wp-content/uploads/2018/01/Daydream.png" />
                      </div>
                      <div className='feature-post small'>
                        <img src="http://www.rockwiththis.com/wp-content/uploads/2018/01/Daydream.png" />
                      </div>
                      <div className='feature-post small'>
                        <img src="http://www.rockwiththis.com/wp-content/uploads/2018/01/Daydream.png" />
                      </div>
                      <div className='feature-post small'>
                        <img src="http://www.rockwiththis.com/wp-content/uploads/2018/01/Daydream.png" />
                      </div>
                      <div className='feature-post small'>
                        <img src="http://www.rockwiththis.com/wp-content/uploads/2018/01/Daydream.png" />
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}

HeroPosts.defaultProps = {
  posts: [{better_featured_image: 'string'},{better_featured_image: 'string'},{better_featured_image: 'string'},{better_featured_image: 'string'},{better_featured_image: 'string'},{better_featured_image: 'string'},{better_featured_image: 'string'}]
}


export default HeroPosts
