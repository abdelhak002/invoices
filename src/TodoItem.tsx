import { Dispatch, SetStateAction } from 'react'
import { deleteItem, openDatabase, updateItem } from './services/idb'

const TodoItem = ({ todo, setTodoList, getAllTodos }: { todo: Todo; setTodoList: Dispatch<SetStateAction<Todo[]>>; getAllTodos: () => Promise<void> }) => {
  async function handleToggleComplete(id: number, todo: Todo) {
    const db = await openDatabase()
    const updatedData = { ...todo, completed: !todo.completed }
    const updatedTodos = await updateItem(db, 'todos', id, updatedData)
    console.log({ updatedTodos, msg: 'updated' })
    setTodoList((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    getAllTodos()
  }

  async function handleDeleteItem(id: number) {
    const db = await openDatabase()
    const deleteItemRes = await deleteItem(db, 'todos', id)
    console.log({ deleteItemRes, msg: 'Item Deleted' })
    getAllTodos()
  }
  return (
    <li className="relative flex items-center justify-between space-x-2 pr-4 text-xl">
      <button title="Delete Task" onClick={() => handleDeleteItem(todo.id)} type="button" className="my-3 rounded-md p-0.5 text-red-500 hover:bg-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className={`${todo.completed && 'text-red-400 line-through'} flex flex-auto flex-col p-1 text-gray-100`}>
        <span>{todo.title}</span>
        <span className={`${todo.completed ? 'text-red-400' : ' text-gray-400'} pl-2 text-base`}>{todo.dueDate || 'N/A'}</span>
      </div>
      <input
        title="Mark as Done/Un-Done"
        type="checkbox"
        checked={todo.completed}
        className="h-5 w-5 accent-[rgb(255,88,88)] "
        onChange={() => handleToggleComplete(todo.id, todo)}
      />
    </li>
  )
}

export default TodoItem
