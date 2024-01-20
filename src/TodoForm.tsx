import { Dispatch, SetStateAction, useState } from 'react'
import { addData, openDatabase } from './services/idb'

const TodoForm = ({ setTodoList }: { setTodoList: Dispatch<SetStateAction<Todo[]>> }) => {
  const [title, setTitle] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  async function exampleAddDataUsage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title) return
    try {
      const db = await openDatabase()
      const newTodo: Todo = { id: new Date().getTime(), title, dueDate, completed: false }
      const res = await addData<Todo>(db, 'todos', newTodo)
      console.log('Data added successfully.')
      console.log({ res })
      setTodoList((prevTodos) => [...prevTodos, newTodo])
      setTitle('')
      setDueDate('')
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }

  return (
    <form onSubmit={exampleAddDataUsage} className="z-10 mb-6 w-full rounded-lg bg-gray-900 p-2">
      <div className="w-full space-y-2 px-2 md:px-0">
        <input
          type="text"
          id="large-input"
          className="w-full rounded-lg border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 outline-none focus:border-[rgb(255,88,88)] focus:ring focus:ring-[rgb(255,88,88)] focus:ring-opacity-50"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Task Title"
        />
        <div className="flex items-center justify-between space-x-2">
          <input
            type="date"
            id="due-date"
            className="w-full rounded-lg border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 outline-none focus:border-[rgb(255,88,88)] focus:ring focus:ring-[rgb(255,88,88)] focus:ring-opacity-50 md:w-1/2"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            min={new Date().toISOString().split('T')[0]}
          />
          <button
            disabled={!title || !dueDate}
            type="submit"
            className="rounded-lg bg-[rgb(255,88,88)] px-3 py-2.5 text-center text-sm font-medium text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-800 enabled:hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-opacity-80 disabled:text-opacity-95 sm:max-w-min xl:px-5"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm
