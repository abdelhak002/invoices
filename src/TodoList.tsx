import { Dispatch, SetStateAction, useEffect } from 'react'
import { Todo } from './App'
import { deleteItem, displayData, openDatabase, updateItem } from './services/idb'

interface TodoListProps {
  todoList: Todo[]
  setTodoList: Dispatch<SetStateAction<Todo[]>>
}

const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  async function getAllTodos() {
    const db = await openDatabase()
    try {
      const todos = await displayData<Todo>(db, 'todos')
      console.log({ todos })
      setTodoList(todos)
    } catch (error) {
      console.error('Error displaying data:', error)
    }
  }

  useEffect(() => {
    getAllTodos()
  }, [])

  async function handleToggleComplete(id: number, todo: Todo) {
    const db = await openDatabase()
    const updatedData = { ...todo, completed: !todo.completed }
    const updatedTodos = await updateItem(db, 'todos', id, updatedData)
    console.log({ updatedTodos, msg: 'updated' })
    setTodoList((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  async function handleDeleteItem(id: number) {
    const db = await openDatabase()
    const deleteItemRes = await deleteItem(db, 'todos', id)
    console.log({ deleteItemRes, msg: 'Item Deleted' })
    getAllTodos()
  }

  return (
    <div className="w-[97%] md:w-full rounded-md bg-gray-700">
      <ul className="w-full divide-y divide-gray-600">
        {todoList.length === 0 && <li className="p-4 text-xl text-white">There are no Todos</li>}
        {todoList.length > 0 &&
          todoList.map((todo) => (
            <li key={todo.id} className="relative flex items-center justify-between space-x-2 pr-4 text-xl">
              <button onClick={() => handleDeleteItem(todo.id)} type="button" className="h-12 px-3 text-red-500 hover:bg-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className={`${todo.completed && 'text-red-400 line-through'} flex-auto text-gray-100`}>{todo.title}</span>
              <input type="checkbox" defaultChecked={todo.completed} className="h-5 w-5 accent-[rgb(255,88,88)] " onChange={() => handleToggleComplete(todo.id, todo)} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TodoList
