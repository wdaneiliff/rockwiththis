export const FETCH_POSTS = {
    IN_PROGRESS: 'FETCH_POSTS_IN_PROGRESS',
    SUCCESS: 'FETCH_POSTS_SUCCESS',
    FAILURE: 'FETCH_POSTS_FAILURE',
}


export const fetchPosts = (pageNumber = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCH_POSTS.IN_PROGRESS,
    })
    const dataURL = 'https://rockwiththis.com/wp-json/wp/v2/songs?_embed[posts_per_page]=100'
    fetch(dataURL).then(res => res.json()).then((res) => {
        dispatch({
            type: FETCH_POSTS.SUCCESS,
            posts: res,
            pageNumber,
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_POSTS.FAILURE,
        })
    })
}
