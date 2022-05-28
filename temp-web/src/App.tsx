import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ItemUpload from './pages/ItemUpload';
import ItemDetail from './pages/ItemDetailsPage';

function App() {
  // reload ItemList after Listing complete
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/ItemUpload' element={<ItemUpload />} />
        <Route path="/items/:itemId" element={<ItemDetail />} />
      </Routes>
    </Router>
  )
}

export default App;