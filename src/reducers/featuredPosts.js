import { FETCH_FEATURED_POSTS } from '../actions/featuredPosts'

export default (state = [], action) => {
    switch (action.type) {
    case FETCH_FEATURED_POSTS.SUCCESS:
        return action.featuredPosts
    default:
        return state
    }
}
