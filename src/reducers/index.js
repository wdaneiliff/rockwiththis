import { combineReducers } from 'redux'
import { FETCH_POSTS } from '../actions/index'
import { FETCH_FEATURED_POSTS } from '../actions/featuredPosts'
import { FETCH_FILTERS } from '../actions/filters'
import { FETCH_SINGLE_SONG } from '../actions/singleSong'
import { FETCH_RELATED_SONGS } from '../actions/relatedSongs'
import { PREVIEW_SCROLL_LAYOUT } from '../actions/discoverLayout'
import { NORMAL_LAYOUT } from '../actions/discoverLayout'
import { FULL_GRID_LAYOUT } from '../actions/discoverLayout'
import posts from './posts'
import featuredPosts from './featuredPosts'
import queue from './queue'
import singleSong from './singleSong'
import relatedSongs from './relatedSongs'
import filters from './filters'
import update from 'react-addons-update'
import { handleActions } from 'redux-actions'
// import discoverLayout from './discoverLayout'

export const INITIAL_STATE = {
  shrinkHeader: false,
  isPlaying: false,
  discoverLayout: {
    expanded: true,
    snapshot: false,
    fullGrid: false,
  },
  activeSong: {
    better_featured_image: '',
    acf: {
      
    }
  },
  featuredPosts: [],
  posts: [],
  queue: [],
  relatedSongs: [],
  filters: [],
  currentlyFetchedPageNumber: 0,

}

const appReducers = handleActions({
  'app/FETCH_POSTS': (state, action) => {
    return update(state, {
      posts: { $set: action.payload },
      activeSong: { $set: action.payload[0] },
    })
  },
}, INITIAL_STATE)

const currentlyFetchedPageNumber = (state = 0, action) => {
    switch (action.type) {
    case FETCH_POSTS.SUCCESS:
        return action.pageNumber + 1
    default:
        return state
    }
}

const discoverLayout = (state = {previewScrollLayout: false}, action) => {
  switch(action.type) {
    case PREVIEW_SCROLL_LAYOUT:
        return Object.assign({}, state, {previewScrollLayout: true, fullGridLayout: false})

    case FULL_GRID_LAYOUT:
        return Object.assign({}, state, {previewScrollLayout: false, fullGridLayout: true})

    case NORMAL_LAYOUT:
        return Object.assign({}, state, {previewScrollLayout: false, fullGridLayout: false})
    default:
    return state
  }
}

export default appReducers

// export default combineReducers({
//     appReducers,
//     queue,
//     featuredPosts,
//     filters,
//     singleSong,
//     relatedSongs,
//     currentlyFetchedPageNumber,
//     discoverLayout
// })
