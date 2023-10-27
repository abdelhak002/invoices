const TodoForm = () => {
  return (
    <form className="w-full px-4">
      <div className="mb-6 flex w-full space-x-2">
        <input
          type="text"
          id="large-input"
          className="sm:text-md flex-auto rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-lg text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default TodoForm
