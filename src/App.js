import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./omz_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseLayout from "./components/layout/BaseLayout";
import MovieList from "./components/movies/MovieList";
import MovieDetail from "./components/movies/MovieDetail";
import Signup from "./components/client/Signup";
import Login from "./components/client/Login";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<MovieList />} />
          <Route path="client/Signup" element={<Signup />} />
          <Route path="client/Login" element={<Login />} />
          <Route path="movie/:movieId" element={<MovieDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
