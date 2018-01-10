export const FETCH_FEATURED_POSTS = {
    IN_PROGRESS: 'FETCH_FEATURED_POSTS_IN_PROGRESS',
    SUCCESS: 'FETCH_FEATURED_POSTS_SUCCESS',
    FAILURE: 'FETCH_FEATURED_POSTS_FAILURE',
}


export const fetchFeaturedPosts = (pageNumber = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCH_FEATURED_POSTS.IN_PROGRESS,
    })
    const dataURL = 'https://rockwiththis.com/wp-json/wp/v2/songs?categories=93'
    fetch(dataURL).then(res => res.json()).then((res) => {
        dispatch({
            type: FETCH_FEATURED_POSTS.SUCCESS,
            featuredPosts: res,
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_FEATURED_POSTS.FAILURE,
        })
    })
}
