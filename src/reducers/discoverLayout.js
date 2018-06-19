export default function fetchDiscoverLayout(state = {previewScrollLayout: false}, action) {

switch (action.type) {

    case types.PREVIEW_SCROLL_LAYOUT:
        return Object.assign({}, state, {previewScrollLayout: true})

    case types.NORMAL_LAYOUT:
        return Object.assign({}, state, {previewScrollLayout: false})

    default:
        return state

 }
}
