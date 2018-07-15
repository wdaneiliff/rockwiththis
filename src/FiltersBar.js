import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFilters } from './actions/filters'

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
    }

    componentDidMount() {
        window.addEventListener('scroll', this.fixedFiltersBar)
        window.addEventListener('resize', this.fixedFiltersBar);
    }

    fetchCurrentRequest() {
      const callback = () => {
        this.setState({
          showSubGenreFilters: false,
          showToggleViewsDropdown: false,
        })
      }
      this.props.actions.fetchCurrentRequest(callback)
    }

    fixedFiltersBar() {
        const scrollHeight = document.getElementById('hero-post').clientHeight + 45
        const fixedFilterBar = window.scrollY > scrollHeight
        this.setState({ fixedFilterBar })
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

        return (
          <div className={`filters-bar ${this.state.fixedFilterBar ? 'fixedFiltersBar' : ''}`}>
          <button onClick={this.showSubGenreFilters} className="filters-button">
            Subgenres
          </button>
          <button onClick={this.showToggleViewsDropdown} className="toggle-view"><i class="im im-menu-list"></i></button>
          <div class="search-wrapper">
                <input class="filter-search"  placeholder=" Search" type="text" value="" name="filter-search" id="search"/>
          </div>

            {
              this.state.showSubGenreFilters
                ? (
                  <div
                    className="SubgenreFiltersDropDown"
                    ref={(element) => {
                      this.SubgenreFiltersDropDown = element;
                    }}
                    >
                    {filterTags}
                    <div className='bottom-buttons'>
                      <button className="large-bottom tag" onClick={this.props.actions.clearFilters}>Clear All</button>
                      <button className="large-bottom tag" onClick={this.fetchCurrentRequest}>Filter</button>
                    </div>
                  </div>
                )
                : (
                  null
                )
            }

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
