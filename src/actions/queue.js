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

/*export const toggleSong = song => (dispatch) => {
    dispatch(TOGGLE_SONG(song))
}*/

export const toggleSong = postId => (dispatch, getState) => {
        /*console.log("getstate is")
        console.log(getState())
        console.log("the post id is")
        console.log(postId)
     const postIndex = getState().filteredPosts.findIndex(obj => obj.id === postId)
     console.log("the opst index is")
     console.log(postIndex)
     const post = getState().filteredPosts[postIndex]
     console.log("the opst is")
     console.log(post)
     const {
         acf: {
             youtube_track_id,
             sc_track_id,
         },
     } = postId.acf
    
     const isPlaying = getState().queue.isPlaying
     const queue = getState().filteredPosts.map(post => post.id).slice(postIndex + 1)
    
     dispatch({
         type: TOGGLE_SONG,
         postId,
         queue,
         isPlaying,
     })*/
    dispatch(TOGGLE_SONG(postId))
}

export const playNextSong = () => (dispatch, getState) => {
    const nextSong = getState().queue.queue[0]
    dispatch(toggleSong(nextSong))
}
