import React from 'react';
import Song from './Song'
import { connect } from 'react-redux'
import { toggleSong } from './actions/queue'



class HeroPosts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const featuredPost = this.props.posts[0]
        // const otherPosts = this.props.posts.slice(6).map(this.renderSong)

        // const previousWeekPosts = otherPosts.map((post) => {
        //   <div className='feature-post small'>
        //
        //   </div>
        // })

        return (
            <div>
                <div className='hero-posts'>
                    <div className='featured-track'>
                      <div className='feature-post large'>
                      // <Song song={featuredPost} />
                      </div>
                    </div>
                    <div className='previous-week'>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
    queue: state.posts,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleSong: postId => dispatch(toggleSong(postId)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeroPosts)
