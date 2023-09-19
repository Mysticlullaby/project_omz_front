import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  });

  const handValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("client/signup", client)
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
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="clientId"
              placeholder="아이디"
              onChange={handValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="clientId"
              placeholder="비밀번호"
              onChange={handValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="clientName"
              placeholder="이름"
              onChange={handValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="전화번호"
              onChange={handValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="이메일"
              onChange={handValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="gender"
              placeholder="성별"
              onChange={handValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="age"
              placeholder="나이"
              onChange={handValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="mbti"
              placeholder="MBTI"
              onChange={handValueChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            가입완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
