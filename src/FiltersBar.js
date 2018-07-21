import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFilters } from './actions/filters'
import LoadingComponent from './LoadingComponent'
import full from './images/full.svg'
import grid from './images/grid.svg'
import snapshot from './images/snapshot.svg'


class FiltersBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
          showSubGenreFilters: false,
          showToggleViewsDropdown: false,
          fixedFilterBar: false
        }

        this.showToggleViewsDropdown = this.showToggleViewsDropdown.bind(this);
        this.closeToggleViewsDropdown = this.closeToggleViewsDropdown.bind(this);
        this.showSubGenreFilters = this.showSubGenreFilters.bind(this);
        this.closeSubGenreFilters = this.closeSubGenreFilters.bind(this);
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
          loading: false,
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
          loading: false,
        })
      }
      this.props.actions.fetchPosts(false, callback)
    }

    fixedFiltersBar() {
        const scrollHeight = document.getElementById('hero-post').clientHeight + 45
        const fixedFilterBar = window.scrollY > scrollHeight
        this.setState({ fixedFilterBar })
        console.log('scroll')
    }

    showSubGenreFilters(event) {
      event.preventDefault();
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
      this.props.actions.changeGridView(e.target.name)
    }


    render() {
        const filterTags = this.props.filters.map((filter, i) => {
          return (
            <button
              className={`tag ${filter.selected ? 'selected' : ''}`}
              onClick={() => this.props.actions.toggleFilter(filter, i)}
            >
              {filter.name}
            </button>
          )
        })
        const disableClearAll = this.props.selectedFilters.length === 0
        return (
          <div className={`filters-bar ${this.state.fixedFilterBar ? 'fixedFiltersBar' : ''}`}>

          <button onClick={this.showToggleViewsDropdown} className="toggle-view mobile"><i class="im im-menu-list"></i></button>
          <ul className="toggleContainer">

            <li className="desktop">
                <img className="desktop" name='expanded' onClick={this.changeGridView} src={full} /><br/>
                <span>Full</span>
            </li>

            <li className="desktop">
                <img className="desktop" name='snapshot' onClick={this.changeGridView} src={snapshot} /><br/>
                <span>Snapshot</span>
            </li>

            <li className="desktop">
                <img className="desktop" name='fullGrid' onClick={this.changeGridView} src={grid} /><br/>
                <span>Grid</span>
            </li>
          </ul>







          <button onClick={this.showSubGenreFilters} className="filters-button">
            Subgenres
          </button>
          <div className="search-wrapper">
                <input className="filter-search"  placeholder=" Search" type="text" value="" name="filter-search" id="search"/>
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
                    <button className="desktop" name='expanded' onClick={this.changeGridView}>Expanded</button><br/>
                    <button className="desktop" name='snapshot' onClick={this.changeGridView}>Snapshot</button><br/>
                    <button className="desktop" name='fullGrid' onClick={this.changeGridView}>Full Grid</button>

                    <button className="mobile" name='snapshot' onClick={this.changeGridView}>Snapshot</button><br/>
                    <button className="mobile" name='expanded' onClick={this.changeGridView}>Playlist</button><br/>
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
