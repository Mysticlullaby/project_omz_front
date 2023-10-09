import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    clientId: "",
    clientPass: "",
  });

  const { clientId, clientPass } = input;

  const navigator = useNavigate();

  const handleValueChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/login", input)
      .then((Response) => {
        console.log(Response.data);

        let jwtToken = Response.headers.get("authorization");
        console.log(jwtToken);

        localStorage.setItem("authorization", jwtToken);
        localStorage.setItem("clientId", Response.data.clientId);
        localStorage.setItem("isLogin", true);

        setInput({ clientId: "", clientPass: "" });
      })
      .then((Response) => {
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row g-3">
        <h1 className="text-center mx-auto">로그인</h1>
        <form onSubmit={onSubmit}>
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              name="clientId"
              className="form-control"
              id="clientId"
              value={clientId}
              placeholder="아이디를 입력해주세요"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="col-md-6 mx-auto">
            <input
              type="password"
              name="clientPass"
              className="form-control"
              id="clientPass"
              value={clientPass}
              placeholder="비밀번호를 입력해주세요"
              maxLength="20"
              onChange={handleValueChange}
            />
          </div>
          <div className="col-md-6 mx-auto">
            <button type="submit" className="btn btn-warning mr-5">
              로그인
            </button>
            <Link className="btn btn-secondary" to="/signup">
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
