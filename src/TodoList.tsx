import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { displayData, openDatabase } from './services/idb'
import StarBackground from './StarBackground'
import TodoItem from './TodoItem'

type TodoListProps = {
  todoList: Todo[]
  setTodoList: Dispatch<SetStateAction<Todo[]>>
}

const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  const [filter, setFilter] = useState('ALL')
  async function getAllTodos() {
    const db = await openDatabase([{ name: 'todos', keyPath: 'id', indexes: [{ name: 'title', keyPath: 'title', options: { unique: false } }] }])
    try {
      const todos = await displayData<Todo>(db, 'todos')
      console.log(todos)
      if (filter === 'ALL') return setTodoList(todos)
      if (filter === 'COMPLETED') return setTodoList(todos.filter((todo) => todo.completed === true))
      if (filter === 'INCOMPLETED') return setTodoList(todos.filter((todo) => todo.completed === false))
    } catch (error) {
      console.error('Error displaying data:', error)
    }
  }

  useEffect(() => {
    getAllTodos()
  }, [filter])

  return (
    <>
      <StarBackground todoCount={todoList.length} />
      <div className="flex flex-col items-center space-y-3 p-4 sm:items-start">
        <select
          className="sm:text-md w-full rounded-lg border border-gray-200 bg-white p-2 text-gray-700 placeholder-gray-600 shadow outline-none focus:border-[rgb(255,88,88)] focus:ring focus:ring-[rgb(255,88,88)] focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 md:w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          id="filter"
        >
          <option value="ALL">All</option>
          <option value="COMPLETED">Completed</option>
          <option value="INCOMPLETED">Incompleted</option>
        </select>
        <div className="z-10 w-full px-2">
          <ul className="w-full space-y-1 divide-y divide-gray-300 dark:divide-gray-700">
            {todoList.length === 0 && <li className="p-4 text-center text-xl text-gray-800 dark:text-white">There are no Todos</li>}
            {todoList.length > 0 &&
              todoList.sort((a, b) => b.id - a.id).map((todo) => <TodoItem key={todo.id} todo={todo} getAllTodos={getAllTodos} setTodoList={setTodoList} />)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default TodoList
