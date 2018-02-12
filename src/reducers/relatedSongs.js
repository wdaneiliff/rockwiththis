import { FETCH_RELATED_SONGS } from '../actions/relatedSongs'

export default (state = [], action) => {
    switch (action.type) {
    case FETCH_RELATED_SONGS.SUCCESS:
        return action.relatedSongs
    default:
        return state
    }
}
