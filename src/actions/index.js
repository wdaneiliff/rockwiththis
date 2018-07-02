export const FETCH_POSTS = {
    IN_PROGRESS: 'FETCH_POSTS_IN_PROGRESS',
    SUCCESS: 'FETCH_POSTS_SUCCESS',
    FAILURE: 'FETCH_POSTS_FAILURE',
}

export const fetchPosts = (pageNumber = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCH_POSTS.IN_PROGRESS,
    })
    const smallDataURL = 'https://rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=7'
    const bigDataURL = 'https://rockwiththis.com/wp-json/wp/v2/songs?_embed&per_page=35'
    fetch(smallDataURL).then(res => res.json()).then((res) => {
        dispatch({
            type: FETCH_POSTS.SUCCESS,
            posts: res,
            pageNumber,
        })
        fetch(bigDataURL).then(resBig => resBig.json()).then((resBig) => {
            dispatch({
                type: FETCH_POSTS.SUCCESS,
                posts: resBig,
                pageNumber,
            })
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_POSTS.FAILURE,
        })
    })
}

export const FETCH_SINGLE_SONG = {
    IN_PROGRESS: 'FETCH_SINGLE_SONG_IN_PROGRESS',
    SUCCESS: 'FETCH_SINGLE_SONG_SUCCESS',
    FAILURE: 'FETCH_SINGLE_SONG_FAILURE',
    UPDATE_SONG_ID: 'UPDATE_SONG_ID'
}

export const fetchSingleSong = slug => (dispatch, getState) => {
    dispatch({
        type: FETCH_SINGLE_SONG.IN_PROGRESS,
    })
    const dataURL = `https://rockwiththis.com/wp-json/wp/v2/songs/${slug}?_embed`
    fetch(dataURL).then(res => res.json()).then((res) => {
        dispatch({
            type: FETCH_SINGLE_SONG.SUCCESS,
            singleSong: res,
        })
    }).catch((er) => {
        dispatch({
            type: FETCH_SINGLE_SONG.FAILURE,
        })
    })
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

export const FETCH_FILTERS = {
    IN_PROGRESS: 'FETCH_FILTERS_IN_PROGRESS',
    SUCCESS: 'FETCH_FILTERS_SUCCESS',
    FAILURE: 'FETCH_FILTERS_FAILURE',
}

export const fetchFilters = (pageNumber = 1) => (dispatch, getState) => {
    dispatch({
        type: FETCH_FILTERS.IN_PROGRESS,
    })
    const dataURL = 'https://rockwiththis.com/wp-json/wp/v2/all-terms'
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

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const toggleSidebar = (expanded) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_SIDEBAR,
            expanded
        })
    }
}

export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE'
export const togglePlayPause = (playPause) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_PLAY_PAUSE,
            playPause
        })
    }
}

export const TOGGLE_SONG = 'TOGGLE_SONG'
export const toggleSong = postId => (dispatch, getState) => {
    const postIndex = getState().posts.findIndex(obj => obj.id === postId)
    const post = getState().posts[postIndex]
    const {
        acf: {
            youtube_track_id,
            sc_track_id,
        },
    } = post

    const isPlaying = getState().queue.isPlaying
    const queue = getState().posts.map(post => post.id).slice(postIndex + 1)
    // const isPlaying = postId === getState().queue.currentlyPlayingSong ? !isCurrentlyPlaying : true

    dispatch({
        type: TOGGLE_SONG,
        postId,
        queue,
        isPlaying,
    })
}

export const playNextSong = () => (dispatch, getState) => {
    debugger
    const nextSong = getState().queue.queue[0]
    dispatch(toggleSong(nextSong))
}

export const PREVIEW_SCROLL_LAYOUT = 'PREVIEW_SCROLL_LAYOUT'
export const changeToPreviewScrollLayout = slug => (dispatch, getState) => {
    dispatch({
        type: PREVIEW_SCROLL_LAYOUT,
    })
}

export const NORMAL_LAYOUT = 'NORMAL_LAYOUT'
export const changeToNormalLayout = slug => (dispatch, getState) => {
    dispatch({
        type: NORMAL_LAYOUT,
    })
}

export const FULL_GRID_LAYOUT = 'FULL_GRID_LAYOUT'
export const changeToFullGridLayout = slug => (dispatch, getState) => {
    dispatch({
        type: FULL_GRID_LAYOUT,
    })
}
