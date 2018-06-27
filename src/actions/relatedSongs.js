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
        const tag2 = tags[1]
        const tag1Songs = `https://rockwiththis.com/wp-json/wp/v2/songs?tags=${tag1}`
        const tag2Songs = `https://rockwiththis.com/wp-json/wp/v2/songs?tags=${tag2}`
        const relatedSongs = [];
        console.log(tag1Songs)
        console.log(dataURL)

        fetch(tag1Songs).then(res => res.json()).then((res) => {
            const relatedSongs = res.slice(0,5)
            // console.log(relatedSongs1)
            // relatedSongs.push([relatedSongs1]);

            fetch(tag2Songs).then(res => res.json()).then((res) => {
                const relatedSongs2 = res.slice(0,5)

                // const relatedSongs = [relatedSongs1, relatedSongs2]
                // console.log(relatedSongs)

                dispatch({
                    type: FETCH_RELATED_SONGS.SUCCESS,
                    relatedSongs,
                })
            })
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_RELATED_SONGS.FAILURE,
        })
    })
}
