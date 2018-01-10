import { combineReducers } from 'redux'
import { FETCH_POSTS } from '../actions/index'
import { FETCH_FEATURED_POSTS } from '../actions/featuredPosts'
import posts from './posts'
import featuredPosts from './featuredPosts'
import queue from './queue'

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
    isFetchingFeaturedPosts,
    isFetchingPosts,
    currentlyFetchedPageNumber,
})
