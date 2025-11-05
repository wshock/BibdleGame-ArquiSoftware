import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import GameSelector from './pages/GameSelector'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className='App'>
      <Header />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <GameSelector />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
