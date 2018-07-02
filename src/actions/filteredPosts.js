export const FETCH_FILTERED_POSTS = {
    IN_PROGRESS: 'FETCH_FILTERED_POSTS_IN_PROGRESS',
    SUCCESS: 'FETCH_FILTERED_POSTS_SUCCESS',
    FAILURE: 'FETCH_FILTERED_POSTS_FAILURE',
}

export const fetchFilteredPosts = tag => (dispatch, getState) => {
    dispatch({
        type: FETCH_FILTERED_POSTS.IN_PROGRESS,
    })
    const dataURL = 'https://rockwiththis.com/wp-json/wp/v2/songs?tags=54'

    fetch(dataURL).then(res => res.json()).then((res) => {
        dispatch({
            type: FETCH_FILTERS.SUCCESS,
            filters: res.tags,
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_FILTERS.FAILURE,
        })
    })
}
