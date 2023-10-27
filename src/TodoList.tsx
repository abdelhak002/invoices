import { Dispatch, SetStateAction } from 'react'
import { Todo } from './App'

interface TodoListProps {
  todoList: Todo[]
  setTodoList: Dispatch<SetStateAction<Todo[]>>
}

const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  function handleToggleComplete(id: number) {
    setTodoList((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <div className="w-full rounded-md bg-gray-700">
      <ul className="w-full divide-y divide-gray-600">
        {todoList.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-4 text-xl">
            <span className="text-gray-100">{todo.title}</span>
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              className="h-5 w-5 accent-indigo-500 "
              onChange={() => handleToggleComplete(todo.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
