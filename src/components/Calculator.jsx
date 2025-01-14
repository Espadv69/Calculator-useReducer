import { useReducer } from 'react'

const initialState = {
  currentValue: '0',
  previousValue: null,
  operation: null,
}

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'ADD_DIGIT':
      // If the current value is 0 and the payload is 0, return the state as is
      if (state.currentValue === '0' && payload === 0) return state

      // If the current value is 0 and the payload is not a dot, return the payload as the new current value
      if (state.currentValue === '0' && payload !== '.') {
        return { ...state, currentValue: payload }
      }

      // If the current value already has a dot and the payload is a dot, return the state as is
      return { ...state, currentValue: state.currentValue + payload }
  }
}
