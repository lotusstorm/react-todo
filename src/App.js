import React, { useState, useEffect } from 'react';
import TodoList from './Todo/TodoList';
import TodoItem from './Todo/ListItem';
import Loader from './Todo/Loader'
import Context from './Todo/context'

const TodoInput = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./Todo/TodoInput'))
  }, 2000)
}))


function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => setTimeout(() => {
        setTodos(todos)
        setLoading(false)
      }, 3000))
  }, [])

  function handleCheck(id) {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function createTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]))
  }

  return (
    <Context.Provider value={ {createTodo} }>
      <div>
        <h1>Todo</h1>
        <React.Suspense fallback={<Loader />}>
          <TodoInput />
        </React.Suspense>
        {
          loading ? <Loader />
          : todos.length ? (
            <TodoList todos={todos}>
              { todos.map(item => <TodoItem key={item.id}
                                            todo={item}
                                            handleCheck={handleCheck}
                                            handleDelete={handleDelete} />)}
            </TodoList>
          ) : <p>no todos</p>
        }
      </div>
    </Context.Provider>
  );
}

export default App;
