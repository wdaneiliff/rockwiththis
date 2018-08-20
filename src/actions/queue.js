export const TOGGLE_SONG = 'TOGGLE_SONG'
export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE'


export const togglePlayPause = (playPause) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_PLAY_PAUSE,
            playPause
        })
    }
}

export const toggleSong = postId => (dispatch, getState) => {
    // const postIndex = getState().posts.findIndex(obj => obj.id === postId)
    // const post = getState().posts[postIndex]
    // const {
    //     acf: {
    //         youtube_track_id,
    //         sc_track_id,
    //     },
    // } = post
    //
    // const isPlaying = getState().queue.isPlaying
    // const queue = getState().posts.map(post => post.id).slice(postIndex + 1)
    //
    // dispatch({
    //     type: TOGGLE_SONG,
    //     postId,
    //     queue,
    //     isPlaying,
    // })
}

export const playNextSong = () => (dispatch, getState) => {
    const nextSong = getState().queue.queue[0]
    dispatch(toggleSong(nextSong))
}
