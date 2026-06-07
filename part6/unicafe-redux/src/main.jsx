import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {
  const handle = (type) => store.dispatch({ type: type })
  return (
    <div>
      <button onClick={() => handle('GOOD')}>good</button>
      <button onClick={() => handle('OK')}>ok</button>
      <button onClick={() => handle('BAD')}>bad</button>
      <button onClick={() => handle('RESET')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
