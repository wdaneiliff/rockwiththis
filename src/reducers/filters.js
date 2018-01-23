import { FETCH_FILTERS } from '../actions/filters'

export default (state = [], action) => {
    switch (action.type) {
    case FETCH_FILTERS.SUCCESS:
        return action.filters
    default:
        return state
    }
}
