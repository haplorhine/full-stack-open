import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      <label>
        filter
        <input
          onChange={(event) => dispatch(filterChange(event.target.value))}
          name="filter"
        />
      </label>
    </div>
  )
}

export default Filter
