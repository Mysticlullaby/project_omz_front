import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// http://localhost:3000/client/signup

const Signup = () => {
  const navigator = useNavigate();

  const [client, setClient] = useState({
    clientId: "",
    clientPass: "",
    clientName: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    mbti: "",
    grade: "member",
  });

  const handleValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/client/signup", client)
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
        <div class="row g-3">
          <h1 className="text-center mx-auto">회원가입</h1>
          <div class="col-md-6">
            <input
              type="text"
              className="form-control"
              name="clientId"
              pattern="[A-Za-z0-9]{3,8}"
              placeholder="아이디를 입력해주세요(영문,숫자 3~8자)"
              onChange={handleValueChange}
            />
          </div>
          <div class="col-md-6">
            <input
              type="password"
              className="form-control"
              name="clientPass"
              pattern="[a-zA-Z0-9]{8,15}"
              placeholder="비밀번호를 입력해주세요(영문,숫자 8~15자)"
              onChange={handleValueChange}
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              className="form-control"
              name="clientName"
              pattern="[가-힣]{3,7}"
              placeholder="이름을 입력해주세요(한글 3~7자)"
              onChange={handleValueChange}
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              className="form-control"
              name="phone"
              pattern="[0-9]{10,11}"
              placeholder="예) 01012345678"
              onChange={handleValueChange}
            />
          </div>
          <div class="col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              pattern="[A-Za-z0-9]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}"
              placeholder="예) omz@OMZ.com"
              onChange={handleValueChange}
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              className="form-control"
              name="age"
              pattern="[0-9]{2,3}"
              placeholder="나이를 입력해주세요(숫자 2~3자)"
              onChange={handleValueChange}
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              className="form-control"
              name="gender"
              placeholder="성별"
              onChange={handleValueChange}
            />
          </div>
          <div class="col-md-6">
            <input
              type="text"
              className="form-control"
              name="mbti"
              placeholder="MBTI"
              onChange={handleValueChange}
            />
          </div>

          <div class="dropdown">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              name="mbti"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onChange={handleValueChange}
            >
              MBTI
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li>
                <a class="dropdown-item active" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div>

          <div classname="col-12">
            <button type="submit" class="btn btn-warning">
              가입완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
