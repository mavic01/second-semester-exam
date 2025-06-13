import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Todos from './pages/Todos'
import TodoDetail from './pages/TodoDetail'


function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
