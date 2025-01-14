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

    case 'CALCULATE':
      // If there is no operation or previous value, return the state as is
      if (!state.operation || state.previousValue === null) return state

      // Convert the previous and the current value to numbers
      const prev = parseFloat(state.previousValue)
      const current = parseFloat(state.currentValue)

      // Perform the operation based on the operation type
      const operations = {
        '+': prev + current,
        '-': prev - current,
        '*': prev * current,
        '/': prev / current,
      }

      // Return the new state with the result of the operation as the current value
      return {
        currentValue: operations[state.operation]?.toString() || '0',
        previousValue: null,
        operation: null,
      }

    case 'CLEAR':
      // Return the initial state
      return initialState

    default:
      // If the action type is not recognized, return the state as is
      return state
  }
}

export const Calculator = () => {
  // Use the reducer hook to manage the state of the calculator
  const [state, dispatch] = useReducer(reducer, initialState)

  // Function to handle the actions dispatched by the buttons
  // This function will be passed to the buttons as a prop
  // For example: <button onClick={() => handleAction('ADD_DIGIT', 1)}>1</button>
  const handleAction = (type, payload) => dispatch({ type, payload })

  return (
    <div className="calculator">
      <div className="display">{state.currentValue}</div>
      <div className="buttons">{/* map buttons */}</div>
    </div>
  )
}
