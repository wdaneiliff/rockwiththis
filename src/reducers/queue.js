import { combineReducers } from 'redux'
import { TOGGLE_SONG } from '../actions/queue'

const queue = (state = [], action) => {
    switch (action.type) {
    case TOGGLE_SONG:
        return action.queue
    default:
        return state
    }
}

const currentlyPlayingSong = (state = null, action) => {
    switch (action.type) {
    case TOGGLE_SONG:
        return action.postId
    default:
        return state
    }
}

const seekTime = (state = 0, action) => {
    switch (action.type) {
    default:
        return state
    }
}

const isPlaying = (state = false, action) => {
    switch (action.type) {
    case TOGGLE_SONG:
        return action.isPlaying
    default:
        return state
    }
}

export default combineReducers({
    queue,
    currentlyPlayingSong,
    seekTime,
})
