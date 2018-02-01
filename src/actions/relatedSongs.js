export const FETCH_RELATED_SONGS = {
    IN_PROGRESS: 'FETCH_RELATED_SONGS_IN_PROGRESS',
    SUCCESS: 'FETCH_RELATED_SONGS_SUCCESS',
    FAILURE: 'FETCH_RELATED_SONGS_FAILURE',
}



export const fetchRelatedSongs = tag => (dispatch, getState) => {

    dispatch({
        type: FETCH_RELATED_SONGS.IN_PROGRESS,
    })

    const dataURL = `https://rockwiththis.info/wp-json/wp/v2/songs?tags=${tag}`
    fetch(dataURL).then(res => res.json()).then((res) => {
        dispatch({
            type: FETCH_RELATED_SONGS.SUCCESS,
            relatedSongs: res
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_RELATED_SONGS.FAILURE,
        })
    })
}
