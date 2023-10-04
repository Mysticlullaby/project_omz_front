import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const Signup = () => {
  const navigator = useNavigate();

  const [client, setClient] = useState({
    clientId: "",
    clientPass: "",
    clientName: "",
    mbti: "",
    grade: "member",
  });

  const handleValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/signup", client)
      .then((Response) => {
        navigator("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <h1 className="text-center mx-auto">회원가입</h1>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="clientId"
              pattern="[A-Za-z0-9]{3,8}"
              placeholder="아이디를 입력해주세요(영문,숫자 3~8자)"
              onChange={handleValueChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              name="clientPass"
              pattern="[a-zA-Z0-9]{8,15}"
              placeholder="비밀번호를 입력해주세요(영문,숫자 8~15자)"
              onChange={handleValueChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="clientName"
              pattern="[가-힣]{3,7}"
              placeholder="이름을 입력해주세요(한글 3~7자)"
              onChange={handleValueChange}
            />
          </div>
          {/* <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="mbti"
              placeholder="MBTI"
              onChange={handleValueChange}
            />
          </div> */}

          <div class="Dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              MBTI
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="#">
                  ESTP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ESFP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ENFP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ENTP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ESTJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ESFJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ENFJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ENTJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ISTJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ISFJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  INFJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  INTJ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ISTP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  ISFP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  INFP
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  INTP
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-warning">
              가입완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
