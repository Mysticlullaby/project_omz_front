import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigator = useNavigate();

  const [input, setInput] = useState({
    clientId: "",
    clientPass: "",
  });

  const { clientId, clientPass } = input;

  const handleValueChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 로그인 아이디 가입여부 확인
  const [loginIdCheck, setLoginIdCheck] = useState("");
  // const IdCheck = async (e) => {
  //   e.preventDefault();
  //   console.log("clientId" + clientId);
  //   await axios.get(`/login/${clientId}`).then(Response);
  //   if (clientId === null) {
  //     setLoginIdCheck("존재하지 않는 아이디");
  //   } else {
  //     setLoginIdCheck("로그인 가능");
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!clientId || !clientPass) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }

    await axios
      .get(`/idcheck/${clientId}`)
      .then((Response) => {
        if (clientId === null) {
          setLoginIdCheck("존재하지 않는 아이디");
        } else {
          setLoginIdCheck("로그인 가능");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post("/login", input)
      .then((Response) => {
        console.log("loginData: ", Response.data);

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

        if (error.response && error.response.status === 401) {
          alert("비밀번호가 맞지 않습니다.");
        }
      });
  };

  return (
    <div className="container login">
      <div className="row g-3">
        <h1 className="text-center mx-auto">로그인</h1>
        <form onSubmit={onSubmit}>
          <div className="col-md-6 mx-auto insert-area">
            아이디
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
          <div className="col-md-6 mx-auto insert-area">
            비밀번호
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
          <div className="col-md-6 mx-auto submit">
            <button type="submit" className="btn btn-danger">
              로그인
            </button>
            &nbsp;
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
