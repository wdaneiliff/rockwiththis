import { combineReducers } from 'redux'
import { FETCH_POSTS } from '../actions/index'
import { FETCH_FEATURED_POSTS } from '../actions/featuredPosts'
import { FETCH_FILTERS } from '../actions/filters'
import { FETCH_SINGLE_SONG } from '../actions/singleSong'
import posts from './posts'
import featuredPosts from './featuredPosts'
import queue from './queue'
import singleSong from './singleSong'
import filters from './filters'

const isFetchingPosts = (state = false, action) => {
    switch (action.type) {
    case FETCH_POSTS.SUCCESS:
    case FETCH_POSTS.FAILURE:
        return false
    case FETCH_POSTS.IN_PROGRESS:
        return true
    default:
        return state
    }
}

const isFetchingFeaturedPosts = (state = false, action) => {
    switch (action.type) {
    case FETCH_FEATURED_POSTS.SUCCESS:
    case FETCH_FEATURED_POSTS.FAILURE:
        return false
    case FETCH_FEATURED_POSTS.IN_PROGRESS:
        return true
    default:
        return state
    }
}

const isFetchingFilters = (state = false, action) => {
    switch (action.type) {
    case FETCH_FILTERS.SUCCESS:
    case FETCH_FILTERS.FAILURE:
        return false
    case FETCH_FILTERS.IN_PROGRESS:
        return true
    default:
        return state
    }
}

const isFetchingSingleSong = (state = false, action) => {
    switch (action.type) {
    case FETCH_SINGLE_SONG.SUCCESS:
    case FETCH_SINGLE_SONG.FAILURE:
        return false
    case FETCH_SINGLE_SONG.IN_PROGRESS:
        return true
    default:
        return state
    }
}

const currentlyFetchedPageNumber = (state = 0, action) => {
    switch (action.type) {
    case FETCH_POSTS.SUCCESS:
        return action.pageNumber + 1
    default:
        return state
    }
}

export default combineReducers({
    posts,
    queue,
    featuredPosts,
    filters,
    singleSong,
    isFetchingFeaturedPosts,
    isFetchingPosts,
    currentlyFetchedPageNumber,
    isFetchingSingleSong,
    isFetchingFilters
})
