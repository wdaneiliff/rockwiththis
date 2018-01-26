export const FETCH_SINGLE_SONG = {
    IN_PROGRESS: 'FETCH_SINGLE_SONG_IN_PROGRESS',
    SUCCESS: 'FETCH_SINGLE_SONG_SUCCESS',
    FAILURE: 'FETCH_SINGLE_SONG_FAILURE',
    UPDATE_SONG_ID: 'UPDATE_SONG_ID'
}



export const fetchSingleSong = slug => (dispatch, getState) => {

    dispatch({
        type: FETCH_SINGLE_SONG.IN_PROGRESS,
    })

    const dataURL = `https://rockwiththis.info/wp-json/wp/v2/songs/${slug}?_embed`
    fetch(dataURL).then(res => res.json()).then((res) => {
        dispatch({
            type: FETCH_SINGLE_SONG.SUCCESS,
            singleSong: res
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_SINGLE_SONG.FAILURE,
        })
    })
}
