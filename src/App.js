import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./omz_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BaseLayout from "./components/layout/BaseLayout";
import MovieList from "./components/movies/MovieList";
import MovieDetail from "./components/movies/MovieDetail";
import Signup from "./components/client/Signup";
import Login from "./components/client/Login";
import BoardList from "./components/board/BoardList";
import BoardWrite from "./components/board/BoardWrite";
import PrivateRoute from "./access/PrivateRoute";
import Logout from "./components/client/Logout";
import ReviewList from "./components/movies/ReviewList";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<MovieList />} />
          <Route path="signup" element={<PrivateRoute isAuth={false} RouteComponent={Signup} />} />
          <Route path="login" element={<PrivateRoute isAuth={false} RouteComponent={Login} />} />
          <Route path='logout' element={<PrivateRoute isAuth={true} RouteComponent={Logout} />} />
          <Route path="movie/:movieId" element={<PrivateRoute isAuth={false} RouteComponent={MovieDetail} />} />
          <Route path="board/list/:currentPage" element={<PrivateRoute isAuth={false} RouteComponent={BoardList} />} />
          <Route path="board/write" element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />} />
          <Route path="board/write/:num" element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />} />
          <Route path="review/page/:movieId/:currentPage" element={<PrivateRoute isAuth={false} RouteComponent={ReviewList} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
