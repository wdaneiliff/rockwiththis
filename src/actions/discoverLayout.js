export const PREVIEW_SCROLL_LAYOUT = 'PREVIEW_SCROLL_LAYOUT'
export const NORMAL_LAYOUT = 'NORMAL_LAYOUT'

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
