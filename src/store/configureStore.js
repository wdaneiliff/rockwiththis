import thunk from 'redux-thunk'
import appReducer from '../reducers/index'
import { createStore, applyMiddleware, compose } from 'redux'
import { createTransform } from 'redux-persist'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  const middleware = [
    thunk
  ].filter(Boolean)
  const store = createStore(
    appReducer,
    composeEnhancers(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  store.subscribe(() => {
    // Will be called everytime the state updates
  })
  return store
}
