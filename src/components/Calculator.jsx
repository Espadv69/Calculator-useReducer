import { useReducer } from 'react'

const initialState = {
  currentValue: '0',
  previousValue: null,
  operation: null,
}

const reducer = (state, action) => {
  const { type, payload } = action
}
