import { Dispatch, SetStateAction, useState } from 'react'
import { Todo } from './App'
import { addData, openDatabase } from './services/idb'

const TodoForm = ({ setTodoList }: { setTodoList: Dispatch<SetStateAction<Todo[]>> }) => {
  const [title, setTitle] = useState<string>('')
  async function exampleAddDataUsage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title) return
    try {
      const db = await openDatabase()
      const newTodo: Todo = { id: new Date().getTime(), title: title, completed: false }
      const res = await addData<Todo>(db, 'todos', newTodo)
      console.log('Data added successfully.')
      console.log({ res })
      setTodoList((prevTodos) => [...prevTodos, newTodo])
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }

  return (
    <form onSubmit={exampleAddDataUsage} className="w-full z-10">
      <div className="mb-6 flex w-full space-x-2 px-2 md:px-0">
        <input
          type="text"
          id="large-input"
          className="sm:text-md flex-auto rounded-lg border border-gray-600 bg-gray-800 p-2.5 text-lg text-white placeholder-gray-400 outline-none focus:border-[rgb(255,88,88)] focus:ring focus:ring-[rgb(255,88,88)] focus:ring-opacity-50"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          disabled={!title}
          type="submit"
          className="rounded-lg bg-[rgb(255,88,88)] px-3 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-800 enabled:hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-opacity-80 disabled:text-opacity-95 sm:w-auto xl:px-5 transition-all ease-in-out duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default TodoForm
