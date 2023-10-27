import { useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

export interface Todo {
  id: number
  title: string
  completed: boolean
}
function App() {

  const todos = [
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    },
    {
      userId: 1,
      id: 4,
      title: 'et porro tempora',
      completed: true,
    },
    {
      userId: 1,
      id: 5,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false,
    },
  ]
  const [todoList, setTodoList] = useState<Todo[]>(todos)

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <h1 className="p-4 text-center text-3xl text-gray-100">Agendify</h1>
      <div className="flex w-full flex-grow flex-col items-center py-4 sm:mx-auto sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
        <TodoForm setTodoList={setTodoList} />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  )
}

export default App
