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
      if (state.currentValue === '0' && payload === 0) return state
      if (state.currentValue === '0' && payload !== '.') {
        return { ...state, currentValue: payload }
      }

      return { ...state, currentValue: state.currentValue + payload }
  }
}
