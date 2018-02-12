export const TOGGLE_SONG = 'TOGGLE_SONG'
export const SET_CURRENT_SONG_DURATION = 'SET_CURRENT_SONG_DURATION'

export const toggleSong = postId => (dispatch, getState) => {
    const postIndex = getState().posts.findIndex(obj => obj.id === postId)
    const post = getState().posts[postIndex]
    const {
        acf: {
            youtube_track_id,
            sc_track_id,
        },
    } = post

    const isCurrentlyPlaying = getState().queue.isPlaying
    const queue = getState().posts.map(post => post.id).slice(postIndex + 1)
    const isPlaying = postId === getState().queue.currentlyPlayingSong ? !isCurrentlyPlaying : true

    dispatch({
        type: TOGGLE_SONG,
        postId,
        queue,
        isPlaying,
    })
}
