export const PREVIEW_SCROLL_LAYOUT = 'PREVIEW_SCROLL_LAYOUT'
export const NORMAL_LAYOUT = 'NORMAL_LAYOUT'
export const FULL_GRID_LAYOUT = 'FULL_GRID_LAYOUT'

export const changeToPreviewScrollLayout = slug => (dispatch, getState) => {
    dispatch({
        type: PREVIEW_SCROLL_LAYOUT,
    })
}

export const changeToNormalLayout = slug => (dispatch, getState) => {
    dispatch({
        type: NORMAL_LAYOUT,
    })
}
export const changeToFullGridLayout = slug => (dispatch, getState) => {
    dispatch({
        type: FULL_GRID_LAYOUT,
    })
}
