import React, { useContext, useState } from 'react';
import Context from './context'

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState('')

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    value,
    clear: () => setValue('')
  }
}

function TodoInput() {
  const {bind, value, clear} = useInputValue('')
  const { createTodo } = useContext(Context)

  function submitHandler(event) {
    event.preventDefault()

    if (value.trim()) {
      createTodo(value)
    }
    clear()
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" {...bind}/>
      <button>+</button>
    </form>
  )
}

export default TodoInput
