import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Media from './Media'

class MediaContainer extends Component {
    constructor(props) {
        super(props)

        this.renderMedia = this.renderMedia.bind(this)

        this.medias = []
    }

    renderMedia(media) {
        return (
            <Media
                key={`${media.id}`}
                ref={(ref) => { this.medias[media.id] = ref }}
                song={media}
            />
        )
    }

    render() {
        const media = this.props.posts.map(this.renderMedia)
        return (
            <div>
                <Media
                    key={this.props.posts[0].id}
                    ref={(ref) => { this.medias[this.props.posts[0].id] = ref }}
                    song={this.props.posts[0]}
                />
                {/*media*/}
            </div>
        )
    }
}

MediaContainer.propTypes = {

}

MediaContainer.defaultProps = {
}

const mapStateToProps = (state, ownProps) => ({
    posts: state.posts,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true },
)(MediaContainer)
