import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFilters } from './actions/filters'

class FiltersBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
          showSubGenreFilters: false,
        }

        this.showSubGenreFilters = this.showSubGenreFilters.bind(this);
        this.closeSubGenreFilters = this.closeSubGenreFilters.bind(this);
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

    render() {
        const filterTags = this.props.filters.map(this.renderFilter)

        return (

          <div className="filters-bar">
            <button className="toggle-view"><img src="http://www.rockwiththis.com/wp-content/uploads/2018/06/iconmonstr-menu-2-48.png" /></button>
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
