import TodoForm from "./TodoForm"

function App() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <h1 className="p-4 text-center text-3xl text-gray-100">Todo React Project</h1>
      <div className="flex w-full flex-grow flex-col items-center bg-gray-700 py-4 sm:mx-auto sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
        <TodoForm />
      </div>
    </div>
  )
}

export default App
