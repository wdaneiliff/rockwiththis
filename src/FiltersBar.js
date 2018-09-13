import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Scroll from 'react-scroll'
import { fetchFilters } from './actions/filters'
import LoadingComponent from './LoadingComponent'
// import full from './images/full.svg'
// import grid from './images/grid.svg'
// import snapshot from './images/snapshot.svg'


class FiltersBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
          filtersToShow: [],
          showSubGenreFilters: false,
          showToggleViewsDropdown: false,
          fixedFilterBar: false
        }

        this.showToggleViewsDropdown = this.showToggleViewsDropdown.bind(this);
        this.closeToggleViewsDropdown = this.closeToggleViewsDropdown.bind(this);
        this.showSubGenreFilters = this.showSubGenreFilters.bind(this);
        this.closeSubGenreFilters = this.closeSubGenreFilters.bind(this);
        this.closeSubGenreFiltersX = this.closeSubGenreFiltersX.bind(this);
        this.fixedFiltersBar = this.fixedFiltersBar.bind(this)
        this.changeGridView = this.changeGridView.bind(this)
        this.fetchCurrentRequest = this.fetchCurrentRequest.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.fixedFiltersBar)
        window.addEventListener('resize', this.fixedFiltersBar);
    }

    fetchCurrentRequest() {
      this.setState({ loading: true })
      const callback = () => {
        document.removeEventListener('click', this.closeSubGenreFilters)
        this.setState({
          showSubGenreFilters: false,
          showToggleViewsDropdown: false,
          fixedFilterBar: true,
          filtersToShow: this.props.selectedFilters,
          loading: false,
        }, () => {
          Scroll.scroller.scrollTo('discoverySectionScroll', {
            duration: 500,
            smooth: true
          })
          Scroll.scroller.scrollTo('scrollToDiscoveryTop', {
            containerId: 'discoverSongsWrapper',
            duration: 500,
            smooth: true
          })
        })
      }
      this.props.actions.fetchCurrentRequest(callback)
    }

    clearFilters() {
      this.setState({ loading: true })
      const callback = () => {
        document.removeEventListener('click', this.closeSubGenreFilters)
        this.setState({
          showSubGenreFilters: false,
          showToggleViewsDropdown: false,
          filtersToShow: [],
          loading: false,
        })
      }
      this.props.actions.fetchPosts(false, callback)
    }

    fixedFiltersBar() {
        const scrollHeight = document.getElementById('hero-post').clientHeight + 45
        const fixedFilterBar = window.scrollY > scrollHeight
        this.setState({ fixedFilterBar })
    }

    showSubGenreFilters(event) {
      // scroller.scrollTo('scroll-to-element', {
      //    duration: 800,
      //    delay: 0,
      //    smooth: 'easeInOutQuart'
      // })

      const scrollHeight = document.getElementById('hero-post').clientHeight + 45



      event.preventDefault();

      // Scroll.scroller.scrollTo('discoverySectionScroll', {
      //   duration: 500,
      //   smooth: true
      // })



      this.setState({
        showSubGenreFilters: true,
      });

      document.addEventListener('click', this.closeSubGenreFilters);
    }

    closeSubGenreFilters() {
      if (this.SubgenreFiltersDropDown && !this.SubgenreFiltersDropDown.contains(event.target)) {
        this.setState({ showSubGenreFilters: false }, () => {
          document.removeEventListener('click', this.closeSubGenreFilters);
        });
      }
    }

    closeSubGenreFiltersX() {
      this.setState({ showSubGenreFilters: false }, () => {
        document.removeEventListener('click', this.closeSubGenreFilters);
      });

    }

    showToggleViewsDropdown(event) {
      event.preventDefault();

      this.setState({
        showToggleViewsDropdown: true,
      });

      document.addEventListener('click', this.closeToggleViewsDropdown);
    }

    closeToggleViewsDropdown() {
        this.setState({ showToggleViewsDropdown: false }, () => {
          document.removeEventListener('click', this.closeToggleViewsDropdown);
        });
    }

    changeGridView(e) {
      e.preventDefault()
      this.props.actions.changeGridView(e.target.name)
    }


    render() {
      const full = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 6h-6v-6h6v6zm18-6h-16v24h16v-24zm-18 9h-6v6h6v-6zm0 9h-6v6h6v-6z"/></svg>
      const snapshot = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z"/></svg>
      const grid = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/></svg>

        const filterTags = this.props.filters.map((filter, i) => {
          return (
            <button
              className={`tag ${filter.selected ? 'selected' : ''}`}
              onClick={() => this.props.actions.toggleFilter(filter, i)}
            >
              #{filter.name}
            </button>
          )
        })

        const selectedFilters = this.state.filtersToShow.map((filter, i) => {
          return (
            <button
              className="tag"
            >
             #{filter.name}
            </button>
          )
        })
        const disableClearAll = this.props.selectedFilters.length === 0
        return (
          <div className={`filters-bar ${this.state.fixedFilterBar ? 'fixedFiltersBar' : ''}`}>
          <div className="filters-bar-content">

              <button onClick={this.showSubGenreFilters} className={`filters-button ${this.state.showSubGenreFilters ? 'active' : ''}`}>
              <i class="im im-angle-down"></i>
                Filter Genres
              </button>
              <div className="search-wrapper">
                    <input className="filter-search"  placeholder=" Search" type="text" value="" name="filter-search" id="search"/>
              </div>

              <div className="selectedFilters">
              {this.state.filtersToShow.length > 0 &&
                <button className={`clearButton ${disableClearAll ? 'disabled' : ''}`} disabled={disableClearAll} onClick={this.clearFilters}>Clear All ({this.state.filtersToShow.length})</button>}
                {selectedFilters}

              </div>

              <button onClick={this.showToggleViewsDropdown} className="toggle-views-button ">Toggle Views <i class="im im-angle-down"></i></button>
              <div className="ToggleViewsWrapper">
              <a className="viewButton" name='expanded' onClick={this.changeGridView}>
                Full
              </a>
              <svg className="viewIcon active" width="30" height="30" viewBox="0 0 24 24"><path d="M24 3h-11v-2h11v2zm0 3h-11v2h11v-2zm0 5h-11v2h11v-2zm0 5h-11v2h11v-2zm0 5h-11v2h11v-2zm-13-20h-11v22h11v-22z"/></svg>

              <a className="viewButton" name='snapshot' onClick={this.changeGridView}>
              Snap
              </a>
              <svg className="viewIcon" width="30" height="30" viewBox="0 0 24 24"><path d="M24 3h-12v-2h12v2zm0 3h-12v2h12v-2zm0 5h-12v2h12v-2zm0 5h-12v2h12v-2zm0 5h-12v2h12v-2zm-14-20h-10v10h10v-10zm0 12h-10v10h10v-10z"/></svg>
              <a className="viewButton" name='fullGrid' onClick={this.changeGridView}>
              Grid
              </a>
              <svg className="viewIcon" width="30" height="30" viewBox="0 0 24 24"><path d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/></svg>

              </div>

          </div>

          <div className={`SubgenreFiltersDropDown ${this.state.showSubGenreFilters ? 'expand' : ''}`}>
            {this.state.loading && <LoadingComponent />}
            {this.state.showSubGenreFilters &&
                <div
                  className='dropdown-internal'
                  ref={(element) => {
                    this.SubgenreFiltersDropDown = element;
                  }}
                  >
                  <button onClick={this.closeSubGenreFiltersX} className="closeDropdown"><i class="im im-x-mark"></i></button>
                  {filterTags}
                  <div className='bottom-buttons'>
                    <button className={`large-bottom tag ${disableClearAll ? 'disabled' : ''}`} disabled={disableClearAll} onClick={this.clearFilters}>Clear All</button>
                    <button className={`large-bottom tag ${disableClearAll ? 'disabled' : ''}`} disabled={disableClearAll} onClick={this.fetchCurrentRequest}>Search Filters {!disableClearAll && <i className='fa fa-arrow-right' />}</button>
                  </div>
                </div>
            }
          </div>

            {
              this.state.showToggleViewsDropdown
                ? (
                  <div
                    className="ToggleViewsDropDown"
                    ref={(element) => {
                      this.ToggleViewsDropDown = element;
                    }}
                    >
                    <button className="desktop" name='expanded' onClick={this.changeGridView}>Full</button>
                    <button className="desktop" name='snapshot' onClick={this.changeGridView}>Snap</button>
                    <button className="desktop" name='fullGrid' onClick={this.changeGridView}>Grid</button>




                    <button className="mobile" name='expanded' onClick={this.changeGridView}>Full</button>
                    <button className="mobile" name='snapshot' onClick={this.changeGridView}>Snap</button>
                    <button className="mobile" name='fullGrid' onClick={this.changeGridView}>Grid</button>
                  </div>
                )
                : (
                  null
                )
            }
          </div>
        )
    }
}

export default FiltersBar
