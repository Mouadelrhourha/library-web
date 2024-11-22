import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DashboardLayout} from './layouts/DashoboardLayout/DashboardLayout';
import {CategoryPage} from './pages/CategoryPage/CategoryPage';
import {HomePage} from './pages/HomePage/HomePage';
import BorrowPage from './pages/BorrowPage/BorrowPage';
import UserPage from './pages/UserPage/UserPage';
import BookPage from './pages/BookPage/BookPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />} >
            <Route path="" element={<HomePage/>} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="borrows" element={<BorrowPage/>} />
            <Route path='users' element={<UserPage/>} />
            <Route path='books' element={<BookPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
