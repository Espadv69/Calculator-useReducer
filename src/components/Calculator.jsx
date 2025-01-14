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

    case 'CHOOSE_OPERATION':
      // If the current value is 0, return the state as is
      if (state.currentValue === '0') return state

      // If there is already an operation, calculate the result before setting the new operation
      return {
        previousValue: state.currentValue,
        operation: payload,
        currentValue: '0',
      }

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
  // For example: <button onClick={() => handleAction('ADD_DIGIT', '1')}>1</button>
  const handleAction = (type, payload) => dispatch({ type, payload })

  const buttons = [
    { label: 'C', type: 'CLEAR' },
    { label: '÷', type: 'CHOOSE_OPERATION', payload: '/' },
    { label: '×', type: 'CHOOSE_OPERATION', payload: '*' },
    { label: '−', type: 'CHOOSE_OPERATION', payload: '-' },

    { label: '7', type: 'ADD_DIGIT', payload: '7' },
    { label: '8', type: 'ADD_DIGIT', payload: '8' },
    { label: '9', type: 'ADD_DIGIT', payload: '9' },
    { label: '+', type: 'CHOOSE_OPERATION', payload: '+' },

    { label: '4', type: 'ADD_DIGIT', payload: '4' },
    { label: '5', type: 'ADD_DIGIT', payload: '5' },
    { label: '6', type: 'ADD_DIGIT', payload: '6' },
    { label: '=', type: 'CALCULATE' },

    { label: '1', type: 'ADD_DIGIT', payload: '1' },
    { label: '2', type: 'ADD_DIGIT', payload: '2' },
    { label: '3', type: 'ADD_DIGIT', payload: '3' },

    { label: '.', type: 'ADD_DIGIT', payload: '.' },
    { label: '0', type: 'ADD_DIGIT', payload: '0', span: 2 },
  ]

  return (
    <div className="calculator">
      <div className="display">{state.currentValue}</div>
      <div className="buttons">
        {buttons.map(({ label, type, payload, span }, index) => (
          <button
            key={index}
            onClick={() => handleAction(type, payload)}
            className={span ? `span-${span}` : ''}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
