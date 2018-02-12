import { FETCH_SINGLE_SONG } from '../actions/singleSong'

export default (state = null, action) => {
    switch (action.type) {
    case FETCH_SINGLE_SONG.SUCCESS:
        return action.singleSong
    default:
        return state
    }
}
