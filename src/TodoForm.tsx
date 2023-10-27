import { Dispatch, SetStateAction, useState } from 'react'
import { Todo } from './App'

const TodoForm = ({ setTodoList }: { setTodoList: Dispatch<SetStateAction<Todo[]>> }) => {
  const [title, setTitle] = useState<string>('')
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title) return
    setTodoList((prevTodos) => [...prevTodos, { id: prevTodos.length + 1, title, completed: false }])
    setTitle('')
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="mb-6 flex w-full space-x-2">
        <input
          type="text"
          id="large-input"
          className="sm:text-md flex-auto rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          disabled={!title}
          type="submit"
          className="w-full disabled:bg-opacity-60 disabled:text-opacity-60 disabled:cursor-not-allowed rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 bg-blue-600 enabled:hover:bg-blue-700 focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default TodoForm
