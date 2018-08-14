import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import YouTube from 'react-youtube'
import { Icon } from 'react-fa'
import { Element } from 'react-scroll'
import HeroPosts from './HeroPosts'
import SongGrid from './SongGrid'
import Song from './Song'
import ShareBox from './ShareBox'
import FiltersBar from './FiltersBar'
import LoadingComponent from './LoadingComponent'
import FullSongPlaceHolder from './FullSongPlaceHolder'
import SongGridPlaceholder from './SongGridPlaceholder'



class SongsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          discoverFullSongIndex: 0,
          fixedFilterBar: false,
          disableScroll: true,
          loading: true,
          gridPage: 1
        }

        this.handleScroll = this.handleScroll.bind(this)
        this.loadMoreSongs = this.loadMoreSongs.bind(this)
        this.changeDiscoverSong = this.changeDiscoverSong.bind(this)
        this.updateDiscoverFullSongIndex = this.updateDiscoverFullSongIndex.bind(this)
        this.fixedFiltersBar = this.fixedFiltersBar.bind(this)
        this.enableDiscoverScroll = this.enableDiscoverScroll.bind(this)
        this.navGrid = this.navGrid.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isPlaying !== nextProps.isPlaying ||
            this.props.activeSong !== nextProps.activeSong) {
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.fixedFiltersBar)
        window.addEventListener('resize', this.fixedFiltersBar);
        window.addEventListener('scroll', this.enableDiscoverScroll)
        window.addEventListener('resize', this.enableDiscoverScroll);
    }

    loadMoreSongs() {
      this.setState({ loadingMoreSongs: true })
      const callback = (noMorePosts) => {
        this.setState({
          loadingMoreSongs: false,
          noMorePosts,
        })
      }
      if (!this.state.loadingMoreSongs) {
        this.props.actions.loadMoreSongs(callback)
      }
    }

    navGrid(e) {
      const num = e ? this.state.gridPage + 1 : this.state.gridPage - 1
      this.setState({
        gridPage: num,
      })
      this.loadMoreSongs()
    }

    handleScroll(e) {
        if (e.target.scrollTop > e.target.scrollHeight - (e.target.offsetHeight + 100)) {
            this.loadMoreSongs()
        }
    }

    changeDiscoverSong(increment) {
        const newIndex = increment ? this.state.discoverFullSongIndex + 1 :
          this.state.discoverFullSongIndex - 1
        this.setState({ discoverFullSongIndex: newIndex })
    }

    updateDiscoverFullSongIndex(e) {
        this.setState({
            discoverFullSongIndex: Number(e.currentTarget.dataset.index)
        })
    }

    fixedFiltersBar() {
        const scrollHeight = document.getElementById('hero-post').clientHeight + 45
        const fixedFilterBar = window.scrollY > scrollHeight
        this.setState({ fixedFilterBar })
    }

    enableDiscoverScroll() {
        const scrollHeight = document.getElementById('hero-post').clientHeight + 45
        window.scrollY > scrollHeight ? this.setState({ disableScroll: false }) : ''
        window.scrollY < scrollHeight ? this.setState({ disableScroll: true }) : ''
    }

    render() {
        const { discoverFullSongIndex } = this.state
        const heroPosts = this.props.posts.slice(0,7)
        const songGrids = []
        let individualGrid = []
        this.props.filteredPosts.forEach((post, index) => {
          individualGrid.push(post)
          if (index > 0 && (index % 15 === 0)) {
            songGrids.push(individualGrid)
            individualGrid = []
          }
        })
        console.log(songGrids)
        const songGridsFull = songGrids.map(thisGrid => {
          return thisGrid.map((song, index) => {
            return (
                <SongGrid
                    {...this.props}
                    index={index}
                    activeDiscoverFullSong={discoverFullSongIndex === index}
                    updateDiscoverFullSongIndex={this.updateDiscoverFullSongIndex}
                    key={song.id}
                    song={song}
                />
            )
          })
        })
        console.log(songGridsFull)

        const songGrid = this.props.filteredPosts.map((song, index) => {
          return (
              <SongGrid
                  {...this.props}
                  index={index}
                  activeDiscoverFullSong={discoverFullSongIndex === index}
                  updateDiscoverFullSongIndex={this.updateDiscoverFullSongIndex}
                  key={song.id}
                  song={song}
              />
          )
        })
        const songList = this.props.filteredPosts.map((song, index) => {
          return(
            <Song
                {...this.props}
                key={`${song.id}`}
                song={song}
            />
          )
        })
        // const disableBack = this.props.posts[0] && this.props.posts[0].id === this.props.activeSong.id



        // Make this section look at `this.props.currentRequestLoading` to change display
        // when the filters are searched for.

        return (
            <div className="songsContainer clearfix">
                <HeroPosts
                    {...this.props}
                    heroPosts={heroPosts}
                />

              <div id="discover" className="discovery-section">
                <Element >
                  <FiltersBar {...this.props} />
                </Element>
                <div id='discoverSongsWrapper' className='discover-songs-wrapper'>
                  <div onScroll={(e) => this.props.discoverLayout === 'snapshot' && !this.state.loadingMore && this.handleScroll(e)} className={`discovery-container ${this.state.disableScroll ? 'disableScroll' : ''} ${this.props.discoverLayout === 'snapshot' ? 'previewScrollLayout' : ''} ${this.props.discoverLayout === 'fullGrid' ? 'fullGridLayout' : ''}`}>
                    {this.props.discoverLayout !== 'snapshot' &&
                      <div className="songGrid">
                          <div className='grid-container-wrapper'>
                            {songGridsFull.map(grid => {
                              return (
                                <div className='grid-container'>
                                  {grid}
                                </div>
                              )
                            })}
                          </div>
                          <div className='song-grid-footer'>

                            <button className='grid-arrow previous' onClick={this.navGrid}>
                              <img src='http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                            </button>
                            <button className='grid-arrow next' onClick={() => this.navGrid(true)}>
                              <img src='http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                            </button>
                          </div>
                      </div>}
                    <div className={`songList ${this.state.fixedFilterBar ? 'fixedFiltersBarPadding' : ''}`}>
                    <div  className="discoverySectionScroll" name='discoverySectionScroll' />
                      {songList}
                    </div>

                    {this.props.discoverLayout !== 'snapshot' &&
                      <div className="discover-full-song">
                        {this.props.filteredPosts[discoverFullSongIndex] &&
                            <Fragment>
                              <button
                              className="toggle-song previous" onClick={() => this.changeDiscoverSong(false)}>

                                    <img src='http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                              </button>

                                  <Song
                                      song={this.props.filteredPosts[discoverFullSongIndex]}
                                  />


                                  <button className="toggle-song next" onClick={() => this.changeDiscoverSong(true)}>
                                        <img src='http://www.dashboard.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-arrow-25-48.png' />
                                  </button>
                            </Fragment>
                        }
                        </div>
                      }
                      {this.state.loadingMoreSongs && !this.state.noMorePosts &&
                          <div className='loading-bottom'>
                              <LoadingComponent />
                          </div>
                      }
                      {this.state.noMorePosts &&
                          <div className='loading-bottom'>
                              <span>No more posts to load.</span>
                          </div>
                      }
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default SongsContainer
