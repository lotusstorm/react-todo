import React from 'react';

function TodoItem({ todo, handleCheck, handleDelete }) {
  return (
    <li>
      <input type="checkbox"
             checked={todo.completed}
             onChange={() => {handleCheck(todo.id)}}/>
      <span>{todo.title}</span>
      <button onClick={() => {handleDelete(todo.id)}}>x</button>
    </li>
  )
}

export default TodoItem
