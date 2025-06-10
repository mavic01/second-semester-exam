import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Todos from './pages/Todos'
import ErrorBoundary from './pages/ErrorBoundary'
import CreateTodos from './pages/CreateTodos'
import TodoDetail from './pages/TodoDetail'

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTodos />} />
      <Route path="/todos" element={<ErrorBoundary><Todos /></ErrorBoundary>} />
      <Route path="/todos/:id" element={<TodoDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
