export const FETCH_POSTS = {
    IN_PROGRESS: 'FETCH_POSTS_IN_PROGRESS',
    SUCCESS: 'FETCH_POSTS_SUCCESS',
    FAILURE: 'FETCH_POSTS_FAILURE',
}


export const fetchPosts = (pageNumber = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCH_POSTS.IN_PROGRESS,
    })
    // changed to 1 song just to make the page load quicker during dev
    const dataURL = 'https://rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=25'
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

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const toggleSidebar = (expanded) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_SIDEBAR,
            expanded
        })
    }
}
