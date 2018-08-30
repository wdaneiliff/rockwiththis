import { createAction } from 'redux-actions'

export const FETCH_POSTS = createAction('app/FETCH_POSTS')
export const SET_REMAINING_POSTS = createAction('app/SET_REMAINING_POSTS')
export const fetchPosts = (pageNumber = 1, callback) => (dispatch) => {
  dispatch(CLEAR_FILTERS())
  const smallDataURL = 'https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=7'
  const bigDataURL = 'https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=9&offset=7'
  fetch(smallDataURL).then(res => res.json()).then((res) => {
    dispatch(FETCH_POSTS(res))
    fetch(bigDataURL).then(resBig => resBig.json()).then((resBig) => {
      if (callback) callback()
      dispatch(SET_REMAINING_POSTS(resBig))
    })
  })
}

export const CURRENT_REQUEST_LOADING = createAction('app/CURRENT_REQUEST_LOADING')
export const FETCH_CURRENT_REQUEST = createAction('app/FETCH_CURRENT_REQUEST')
export const fetchCurrentRequest = (callback) => (dispatch, getState) => {
  dispatch(CURRENT_REQUEST_LOADING(true))
  const baseURL = 'https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=16&tags[]='
  const filterIds = getState().selectedFilters.map(filter => filter.term_id)
  const filterParamsString = filterIds.join('&tags[]=')
  const fullURL = baseURL + filterParamsString
  fetch(fullURL).then(res => res.json()).then((res) => {
    dispatch(CURRENT_REQUEST_LOADING(false))
    if (res.length > 0) {
      dispatch(FETCH_CURRENT_REQUEST(res))
      if (callback) callback()
    } else {
      if (callback) callback(true)
    }
  })
}

export const LOAD_MORE_SONGS = createAction('app/LOAD_MORE_SONGS')
export const loadMoreSongs = (callback) => (dispatch, getState) => {
  const baseURL = `https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=16&offset=${getState().filteredPosts.length}`
  const filterIds = getState().selectedFilters.map(filter => filter.term_id)
  const filterParamsString = filterIds.length > 0 ? '&tags[]=' + filterIds.join('&tags[]=') : ''
  const fullURL = baseURL + filterParamsString
  fetch(fullURL).then(res => res.json()).then((res) => {
    if (res.length > 0) {
      dispatch(LOAD_MORE_SONGS(res))
      if (callback) callback()
    } else {
      if (callback) callback(true)
    }
  })
}

export const TOGGLE_PLAY_PAUSE = createAction('app/TOGGLE_PLAY_PAUSE')
export const togglePlayPause = playPause => (dispatch) => {
    console.log("toggling")
    dispatch(TOGGLE_PLAY_PAUSE(playPause))
}

export const TOGGLE_SONG = createAction('app/TOGGLE_SONG')
export const toggleSong = song => (dispatch) => {
    console.log("the song is")
    console.log(song)
    dispatch(TOGGLE_SONG(song))
}

export const CHANGE_GRID_VIEW = createAction('app/CHANGE_GRID_VIEW')
export const changeGridView = layout => (dispatch) => {
    dispatch(CHANGE_GRID_VIEW(layout))
}

export const FETCH_FILTERS = createAction('app/FETCH_FILTERS')
export const fetchFilters = () => (dispatch) => {
    const dataURL = 'https://dashboard.rockwiththis.com/wp-json/wp/v2/all-terms'
    fetch(dataURL).then(res => res.json()).then((res) => {
        dispatch(FETCH_FILTERS(res))
    }).catch((er) => {
        dispatch({
            type: FETCH_FILTERS.FAILURE,
        })
    })
}

export const TOGGLE_FILTER = createAction('app/TOGGLE_FILTER')
export const toggleFilter = (filter, i) => (dispatch) => {
    const payload = { filter, i }
    dispatch(TOGGLE_FILTER(payload))
}

export const CLEAR_FILTERS = createAction('app/CLEAR_FILTERS')
export const clearFilters = () => (dispatch) => {
    dispatch(CLEAR_FILTERS())
}

export const FETCH_SINGLE_SONG = createAction('app/FETCH_SINGLE_SONG')
export const SET_RELATED_SONGS = createAction('app/SET_RELATED_SONGS')
export const fetchSingleSong = (songId, callback) => (dispatch) => {
  const songURL = `https://dashboard.rockwiththis.com/wp-json/wp/v2/songs/${songId}`
  fetch(songURL).then(res => res.json()).then((res) => {
    dispatch(FETCH_SINGLE_SONG(res))
    callback()
    const baseURL = 'https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=35&tags[]='
    const filterIds = res.pure_taxonomies.tags.map(filter => filter.term_id)
    const filterParamsString = filterIds.join('&tags[]=')
    const fullURL = baseURL + filterParamsString
    fetch(fullURL).then(related_res => related_res.json()).then((related_res) => {
      dispatch(SET_RELATED_SONGS(related_res))
    })
  })
}

export const CLEAR_SINGLE_SONG = createAction('app/CLEAR_SINGLE_SONG')
export const clearSingleSong = () => (dispatch) => {
  dispatch(CLEAR_SINGLE_SONG())
}

export const SET_SONG_PROGRESS = createAction('app/SET_SONG_PROGRESS')
export const setSongProgress = (played) => (dispatch) => {
  dispatch(SET_SONG_PROGRESS(played))
}

export const SET_SONG_DURATION = createAction('app/SET_SONG_DURATION')
export const setSongDuration = (duration) => (dispatch) => {
  dispatch(SET_SONG_DURATION(duration))
}

export const FETCH_RELATED_SONGS = {
    IN_PROGRESS: 'FETCH_RELATED_SONGS_IN_PROGRESS',
    SUCCESS: 'FETCH_RELATED_SONGS_SUCCESS',
    FAILURE: 'FETCH_RELATED_SONGS_FAILURE',
}

export const fetchRelatedSongs = slug => (dispatch, getState) => {
    dispatch({
        type: FETCH_RELATED_SONGS.IN_PROGRESS,
    })
    const dataURL = `https://dashboard.rockwiththis.com/wp-json/wp/v2/songs/${slug}?_embed`
    fetch(dataURL).then(res => res.json()).then((res) => {
        const tags = res.tags
        const tag1 = tags[0]
        const tag2 = tags[1]
        const tag1Songs = `https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?tags=${tag1}`
        const tag2Songs = `https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?tags=${tag2}`
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

export const FETCH_FEATURED_POSTS = {
    IN_PROGRESS: 'FETCH_FEATURED_POSTS_IN_PROGRESS',
    SUCCESS: 'FETCH_FEATURED_POSTS_SUCCESS',
    FAILURE: 'FETCH_FEATURED_POSTS_FAILURE',
}

export const fetchFeaturedPosts = (pageNumber = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCH_FEATURED_POSTS.IN_PROGRESS,
    })
    const dataURL = 'https://dashboard.rockwiththis.com/wp-json/wp/v2/songs?categories=93'
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

export const playNextSong = () => (dispatch, getState) => {
    const nextSong = getState().queue.queue[0]
    dispatch(toggleSong(nextSong))
}
