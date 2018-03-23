import React, { Component } from 'react'
import SidebarFilters from './SidebarFilters.js'

class SidebarFiltersWrapper extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={`sidebar-filters-wrapper ${this.props.expanded ? 'expanded' : ''}`}>
        {this.props.expanded && <SidebarFilters />}
      </div>
    )
  }
}

export default SidebarFiltersWrapper
