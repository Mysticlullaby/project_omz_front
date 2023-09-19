import { Route, Routes } from 'react-router-dom';
import './App.css';
import './Omz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseLayout from './components/layout/BaseLayout';
import MovieList from './components/movies/MovieList';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<BaseLayout />} >
          <Route index element={<MovieList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
