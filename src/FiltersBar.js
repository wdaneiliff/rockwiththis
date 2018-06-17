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
    }

    componentDidMount() {
        window.addEventListener('scroll', this.fixedFiltersBar)
        window.addEventListener("resize", this.fixedFiltersBar);

    }

    fixedFiltersBar() {
        const scrollHeight = document.getElementById('hero-post').clientHeight + 45
        const fixedFilterBar = window.scrollY > scrollHeight
        this.setState({ fixedFilterBar })
    }

    renderFilter(tag, index) {
        return (
            <span className="tag" onClick={() => this.props.onFilter(tag.id)}>{tag.name}</span>
        )
    }

    showSubGenreFilters(event) {
      event.preventDefault();

      this.setState({
        showSubGenreFilters: true,
      });

      document.addEventListener('click', this.closeSubGenreFilters);
    }

    closeSubGenreFilters() {

      if (!this.SubgenreFiltersDropDown.contains(event.target)) {

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

      if (!this.ToggleViewsDropDown.contains(event.target)) {

        this.setState({ showToggleViewsDropdown: false }, () => {
          document.removeEventListener('click', this.closeToggleViewsDropdown);
        });

      }
  }


    render() {
        const filterTags = this.props.filters.map(this.renderFilter)

        return (
          <div className={`filters-bar ${this.state.fixedFilterBar ? 'fixedFiltersBar' : ''}`}>
            <button onClick={this.showToggleViewsDropdown} className="toggle-view"><i class="im im-menu-list"></i></button>
            <button onClick={this.showSubGenreFilters} className="filters-button">
              Filters
            </button>
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
                    <button className="clearAll tag">Clear All</button>
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
                    <button>Grid</button><br/>
                    <button>Song List</button>
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

const mapStateToProps = (state, ownProps) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FiltersBar)
