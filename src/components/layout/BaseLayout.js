import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="px-5">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-space-between" id="navbarNav">
            <div className="main-title">
              <Link to={"/"}>
                <img src="/images/LOGO.png" />
              </Link>

              <ul className="navbar-nav align-items-center">
                {localStorage.getItem("clientId") != null ? (
                  <>
                    <li className="nav-link">{localStorage.getItem("clientId")}님 안녕하세요!</li>
                    <li className="nav-item">
                      <NavLink to="/logout" className="nav-link">
                        로그아웃
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/update" className="nav-link">
                        회원정보 수정
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/board/list/1" className="nav-link">
                        공지사항
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <hr />
      <div className="px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
