import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Editinfo = () => {
  const navigator = useNavigate();

  const [client, setClient] = useState({
    clientId: "",
    clientPass: "",
    clientName: "",
    mbti: "",
  });

  const [selectValue, setSelectValue] = useState(""); // 선택한 값을 useState 관리
  const [passwordCheck, setPasswordChcek] = useState("");

  const { clientId, clientPass, clientName, mbti } = client;

  const config = {
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  };

  // mbti 변경
  const handleChangeMbti = (e) => {
    const selectMbti = e.target.innerText; // 드롭다운에서 선택한 MBTI 값을 가져옴
    setSelectValue(selectMbti); // 선택한 값을 useState에 저장
    setClient({ ...client, mbti: selectMbti }); // 선택한 MBTI를 회원 정보에 저장
  };

  const handleValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  }; // 새로 들어온 값으로 변경함

  // 비밀번호 일치여부 확인
  const passCheck = (e) => {
    const confirmPassword = e.target.value;

    if (clientPass !== confirmPassword) {
      setPasswordChcek("비밀번호 불일치");
    } else {
      setPasswordChcek("비밀번호 일치");
    }
  };

  const info = async () => {
    await axios
      .get(`/editinfo/${localStorage.clientId}`, config)
      .then((Response) => {
        console.log(Response.data);
        setClient({ ...Response.data, clientPass: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    info();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!clientPass) {
      alert("비밀번호를 입력하세요");
      return;
    }

    const confirmPasswordInput = document.getElementById("confirmPassword"); // 필드에 입력된 값을 가져옴
    const confirmPassword = confirmPasswordInput.value; // confirmPassword 값을 가져와 입력된 값을 넣어줌

    if (!confirmPassword) {
      alert("비밀번호 확인을 입력하세요");
      return;
    }

    if (clientPass !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    await axios
      .post("/update", client, config)
      .then((Response) => {
        localStorage.setItem("clientId", clientId);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <h1 className="text-center mx-auto">회원정보</h1>
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              name="clientId"
              placeholder="아이디"
              value={localStorage.clientId}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              name="clientPass"
              pattern="[a-zA-Z0-9]{8,15}"
              placeholder="비밀번호를 입력해주세요(영문,숫자 8~15자)"
              value={clientPass}
              onChange={handleValueChange}
            />
          </div>

          <div className="col-md-6">
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
          </div>

          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name="clientName"
              pattern="[가-힣]{3,7}"
              placeholder="이름을 입력해주세요(한글 3~7자)"
              value={clientName}
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
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ESTP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ESFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ENFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ENTP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ESTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ESFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ENFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ENTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ISTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ISFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  INFJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  INTJ
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ISTP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  ISFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  INFP
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={handleChangeMbti}>
                  INTP
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success">
              회원정보 수정
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editinfo;
