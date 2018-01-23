import axios from 'axios';

export const FETCH_FILTERS = {
    IN_PROGRESS: 'FETCH_FILTERS_IN_PROGRESS',
    SUCCESS: 'FETCH_FILTERS_SUCCESS',
    FAILURE: 'FETCH_FILTERS_FAILURE',
}

export const fetchFilters = (pageNumber = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCH_FILTERS.IN_PROGRESS,
    })
    const dataURL = 'https://rockwiththis.info/wp-json/wp/v2/all-terms'
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
