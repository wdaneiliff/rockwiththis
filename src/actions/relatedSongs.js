export const FETCH_RELATED_SONGS = {
    IN_PROGRESS: 'FETCH_RELATED_SONGS_IN_PROGRESS',
    SUCCESS: 'FETCH_RELATED_SONGS_SUCCESS',
    FAILURE: 'FETCH_RELATED_SONGS_FAILURE',
}



export const fetchRelatedSongs = slug => (dispatch, getState) => {

    dispatch({
        type: FETCH_RELATED_SONGS.IN_PROGRESS,
    })

    const dataURL = `https://rockwiththis.com/wp-json/wp/v2/songs/${slug}?_embed`

    fetch(dataURL).then(res => res.json()).then((res) => {
        const tags = res.tags
        const tag1 = tags[0]
        const tag1Songs = `https://rockwiththis.com/wp-json/wp/v2/songs?tags=${tag1}`

        fetch(tag1Songs).then(res => res.json()).then((res) => {
            const relatedSongs = res.slice(0,3)
            console.log(relatedSongs)

            dispatch({
                type: FETCH_RELATED_SONGS.SUCCESS,
                relatedSongs,
            })
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_RELATED_SONGS.FAILURE,
        })
    })
}
