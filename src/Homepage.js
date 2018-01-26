import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import styles from './Homepage.css'
import SongsContainer from './SongsContainer.js'
import SidebarRight from './SidebarRight.js'
import SidebarFilters from './SidebarFilters.js'
import { fetchPosts } from './actions/index'
import { fetchFeaturedPosts } from './actions/featuredPosts'
import { fetchFilters } from './actions/filters'


class Homepage extends Component {
  constructor(props) {
      super(props)

      this.state = {
        showFilters: false,
      };

      this.toggleFilters = this.toggleFilters.bind(this)
  }

    componentDidMount() {
        this.props.fetchPosts()
        this.props.fetchFeaturedPosts()
        this.props.fetchFilters()
    }



    toggleFilters() {
      this.setState({ showFilters: !this.state.showFilters })
    }

    render() {
      const { showFilters } = this.state
        return (
          <div>
            <button onClick={this.toggleFilters} className="filterButton">
              <i class="fa fa-sliders" aria-hidden="true"></i>
            </button>
            <Sidebar.Pushable as={Segment} attached="bottom" >
              <Sidebar as={Menu} animation="uncover" visible={this.state.showFilters} icon="labeled" vertical inline inverted>
                <SidebarFilters />
              </Sidebar>
               <Sidebar.Pusher>
                 <div className="homeContainer">
                    <SongsContainer />
                    <SidebarRight />
                 </div>
               </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
        )
    }
}

Homepage.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    fetchFeaturedPosts: PropTypes.func.isRequired,
    fetchFilters: PropTypes.func.isRequired,
}


const mapStateToProps = (state, ownProps) => {
    const {
        filters,
        posts,
        featuredPosts,
    } = state

    return {
        filters,
        posts,
        featuredPosts,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchFeaturedPosts: () => dispatch(fetchFeaturedPosts()),
    fetchFilters: () => dispatch(fetchFilters()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Homepage)
