import React from 'react';

class HeroPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const featuredPost = this.props.posts[0]
        const otherPosts = this.props.posts.slice(6)

        const previousWeekPosts = otherPosts.map((post) => {
          <div className='feature-post small'>

          </div>
        })

        return (
            <div>
                <div className='hero-posts'>
                    <div className='featured-track'>
                      <div className='feature-post large'>
                        {/* Big post divs */}
                      </div>
                    </div>
                    <div className='previous-week'>
                      {previousWeekPosts}
                    </div>
                </div>
            </div>
        )
    }
}

export default HeroPosts
