export default function fetchDiscoverLayout(state = {previewScrollLayout: false, fullGridLayout: false }, action) {

switch (action.type) {

        case types.PREVIEW_SCROLL_LAYOUT:
            return Object.assign({}, state, {previewScrollLayout: true, fullGridLayout: false})

        case types.FULL_GRID_LAYOUT:
            return Object.assign({}, state, {previewScrollLayout: false, fullGridLayout: true})

        case types.NORMAL_LAYOUT:
            return Object.assign({}, state, {previewScrollLayout: false, fullGridLayout: false})

    default:
        return state

 }
}
