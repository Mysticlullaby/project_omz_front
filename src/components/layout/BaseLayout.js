import React, { useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";

const BaseLayout = () => {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && document.activeElement === inputRef.current) {
      search();
    }
  };

  const search = () => {
    if (input == "") {
      alert("검색어를 입력하세요");
      return;
    }
    window.location.replace(`/search/${input}`);
    setInput("");
  };

  return (
    <div className="px-5">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-space-between" id="navbarNav">
            <div className="main-title">
              <Link to={"/"}>
                <img src="/images/LOGO.png" />
              </Link>
              <div className="top-header">
                <div className="search-area">
                  <input className="search-input" ref={inputRef} onChange={handleChange} value={input} onKeyDown={handleKeyPress} />
                  <button className="btn btn-danger mx-2" onClick={search}>
                    Search
                  </button>
                </div>
                <div className="lim-header">
                  <ul className="navbar-nav baseL">
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

            {/* <div className="main-title">
              <Link to={"/"}>
                <img src="/images/LOGO.png" />
              </Link>

              <ul className="navbar-nav baseL">
                <input className="search-input" ref={inputRef} onChange={handleChange} value={input} onKeyDown={handleKeyPress} />
                <button className="btn btn-danger mx-2" onClick={search}>
                  Search
                </button>

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
            </div> */}
          </div>
        </div>
      </nav>

      <hr />
      <div className="px-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
