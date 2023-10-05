import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigator = useNavigate();

  const [client, setClient] = useState({
    clientId: "",
    clientPass: "",
    clientName: "",
    mbti: "",
    grade: "member",
  });

  const [clientId, setClientId] = useState("");
  const [clientPass, setClientPass] = useState("");
  const [clientName, setClientName] = useState("");
  const [mbti, setMbti] = useState("");

  const handleValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const [checkId, setCheckId] = useState(false);
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const onCheckId = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/signup/${localStorage.clientId}`, { clientId });
      const { result } = res.data;

      if (!result) {
        setCheckIdMsg("이미 등록된 아이디입니다.");
        setCheckId(false);
      } else {
        setCheckIdMsg("사용 가능한 아이디입니다.");
        setCheckId(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [selectValue, setSelectValue] = useState("");
  const handleInsertMbti = (e) => {
    const selectMbti = e.target.innerText;
    setSelectValue(selectMbti);
    setClient({ ...client, mbti: selectMbti });
  };

  // const [passwordCheck, setPasswordChcek] = useState("");
  // const passCheck = (e) => {
  //   const confirmPassword = e.target.value;

  //   if (clientPass !== confirmPassword) {
  //     setPasswordChcek("비밀번호 불일치");
  //   } else {
  //     setPasswordChcek("비밀번호 일치");
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    // if (!clientPass) {
    //   alert("비밀번호를 입력하세요");
    //   return;
    // }

    // const confirmPasswordInput = document.getElementById("confirmPassword"); // 필드에 입력된 값을 가져옴
    // const confirmPassword = confirmPasswordInput.value; // confirmPassword 값을 가져와 입력된 값을 넣어줌

    // if (!confirmPassword) {
    //   alert("비밀번호 확인을 입력하세요");
    //   return;
    // }

    // if (clientPass !== confirmPassword) {
    //   alert("비밀번호가 일치하지 않습니다");
    //   return;
    // }

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

          {/* <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              pattern="[a-zA-Z0-9]{8,15}"
              placeholder="비밀번호 확인"
              onChange={passCheck}
            />
            <span>{passwordCheck}</span>
          </div> */}

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

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="mbti"
              value={client.mbti}
              readOnly
            />
          </div>

          <div className="Dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              MBTI
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ESTP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ESFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ENFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ENTP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ESTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ESFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ENFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ENTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ISTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ISFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  INFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  INTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ISTP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  ISFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  INFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleInsertMbti}>
                  INTP
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">
              가입완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
