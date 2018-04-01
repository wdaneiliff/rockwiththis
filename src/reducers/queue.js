import { combineReducers } from 'redux'
import { TOGGLE_SONG } from '../actions/queue'
import { TOGGLE_PLAY_PAUSE } from '../actions/queue'


const isPlaying = (state = false, action) => {
    switch (action.type) {
    case TOGGLE_PLAY_PAUSE:
        return action.playPause
    default:
        return state
    }
}

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

export default combineReducers({
    queue,
    currentlyPlayingSong,
    seekTime,
    isPlaying,
})
