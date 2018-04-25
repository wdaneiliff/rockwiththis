import React from 'react';
import Song from './Song'



class HeroPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const featuredPost = this.props.posts[0]
        const posts = this.props.posts
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
                        <img src="http://www.rockwiththis.com/wp-content/uploads/2018/01/Bounce-Town.png" />
                        <span className="song-of-day-tag">Song of the day</span>
                        <div className="post-info">
                        <span className="post-date"><span className="month">June</span><br /><span className="day">13</span></span>
                        <p className="song-info">
                        <span className="song-title">Pancake (feat. Ashnikko)</span><br/>
                        <span className="song-artist">Jaded</span>
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





export default HeroPosts
