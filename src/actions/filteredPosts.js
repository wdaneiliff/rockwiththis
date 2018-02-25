import axios from 'axios';

export const FETCH_FILTERED_POSTS = {
    IN_PROGRESS: 'FETCH_FILTERED_POSTS_IN_PROGRESS',
    SUCCESS: 'FETCH_FILTERED_POSTS_SUCCESS',
    FAILURE: 'FETCH_FILTERED_POSTS_FAILURE',
}

export const fetchFilteredPosts = tag => (dispatch, getState) => {
    dispatch({
        type: FETCH_FILTERED_POSTS.IN_PROGRESS,
    })
    const dataURL = `https://rockwiththis.info/wp-json/wp/v2/songs/funk?_embed`
    axios.get(dataURL).then(res => {
      dispatch({
              type: FETCH_FILTERS.SUCCESS,
              filters: res.data.tags,
      })
    }).catch((er) => {
        dispatch({
            type: FETCH_FILTERS.FAILURE,
        })
    })
}
