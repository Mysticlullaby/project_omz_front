import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  OMZ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/board/list/1" className="nav-link">
                  BOARD
                </NavLink>
              </li>
            </ul>
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    로그인
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    회원가입
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
