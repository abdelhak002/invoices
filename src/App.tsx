import { useState } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Logo from './assets/agendify-high-resolution-logo-transparent.png'
import Footer from './Footer'

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([])

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <img src={Logo} alt="Agendify" className="mx-auto mb-10 mt-20 h-12 xl:my-16" />
      <div className="flex w-full flex-grow flex-col space-y-2 rounded-lg border bg-white py-2 shadow dark:border-gray-700 dark:bg-gray-900 sm:mx-auto sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
        <TodoForm setTodoList={setTodoList} />
        <hr className="mx-auto w-11/12 border-gray-300 dark:border-gray-700" />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
      <Footer />
    </div>
  )
}

export default App
