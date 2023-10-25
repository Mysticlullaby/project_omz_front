import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./omz_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import BaseLayout from "./components/layout/BaseLayout";
import MovieList from "./components/movies/MovieList";
import MovieDetail from "./components/movies/MovieDetail";
import Signup from "./components/client/Signup";
import Login from "./components/client/Login";
import BoardList from "./components/board/BoardList";
import BoardWrite from "./components/board/BoardWrite";
import PrivateRoute from "./access/PrivateRoute";
import Logout from "./components/client/Logout";
import Editinfo from "./components/client/Editinfo";
import ReviewList from "./components/movies/ReviewList";
import ReviewDetail from "./components/movies/ReviewDetail";
import BoardView from "./components/board/BoardView";
import BoardUpdate from "./components/board/BoardUpdate";
import Delete from "./components/client/Delete";
import SearchList from "./components/movies/SearchList";
import MoreList from "./components/movies/MoreList";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<MovieList />} />
          <Route
            path="signup"
            element={<PrivateRoute isAuth={false} RouteComponent={Signup} />}
          />
          <Route
            path="login"
            element={<PrivateRoute isAuth={false} RouteComponent={Login} />}
          />
          <Route
            path="logout"
            element={<PrivateRoute isAuth={true} RouteComponent={Logout} />}
          />
          <Route
            path="update"
            element={<PrivateRoute isAuth={true} RouteComponent={Editinfo} />}
          />
          <Route
            path="delete"
            element={<PrivateRoute isAuth={true} RouteComponent={Delete} />}
          />
          <Route
            path="movie/:movieId"
            element={
              <PrivateRoute isAuth={false} RouteComponent={MovieDetail} />
            }
          />
          <Route
            path="search/:keyword"
            element={
              <PrivateRoute isAuth={false} RouteComponent={SearchList} />
            }
          />
          <Route
            path="board/list/:currentPage"
            element={<PrivateRoute isAuth={false} RouteComponent={BoardList} />}
          />
          <Route
            path="board/write"
            element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />}
          />
          <Route
            path="review/page/:movieId/:currentPage"
            element={
              <PrivateRoute isAuth={false} RouteComponent={ReviewList} />
            }
          />
          <Route
            path="review/detail/:reviewId"
            element={
              <PrivateRoute isAuth={false} RouteComponent={ReviewDetail} />
            }
          />
          <Route
            path="board/write/:omzboardId"
            element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />}
          />
          <Route
            path="board/view/:omzboardId"
            element={<PrivateRoute isAuth={true} RouteComponent={BoardView} />}
          />
          <Route
            path="board/update/:omzboardId"
            element={
              <PrivateRoute isAuth={true} RouteComponent={BoardUpdate} />
            }
          />
          <Route
            path="moreList/:platform"
            element={
              <PrivateRoute isAuth={false} RouteComponent={MoreList} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
