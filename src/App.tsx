import { useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Logo from './assets/agendify-high-resolution-logo-transparent.png'

export interface Todo {
  id: number
  title: string
  completed: boolean
}
function App() {

  const [todoList, setTodoList] = useState<Todo[]>([])

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <img src={Logo} alt="Agendify" className='h-12 mt-20 mb-10 mx-auto xl:my-16'/>
      <div className="flex w-full flex-grow flex-col items-center py-4 sm:mx-auto sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
        <TodoForm setTodoList={setTodoList} />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  )
}

export default App
