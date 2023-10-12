import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigator = useNavigate();

  const [client, setClient] = useState({
    clientId: "",
    clientPass: "",
    clientName: "",
    mbti: "",
    grade: "member",
  });

  const config = {
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  };

  const handleValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  // 아아디 중복확인
  const [checkId, setCheckId] = useState(false);
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const onCheckId = async (e) => {
    e.preventDefault();
    console.log("clientId" + client.clientId);
    await axios
      .get(`/signup/${client.clientId}`)
      .then((Response) => {
        const resMsg = Response.data;
        console.log("clientId" + Response.data);
        if (resMsg) {
          alert("사용가능한 아이디입니다.");
        } else {
          alert("이미 사용중인 아이디입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 비밀번호 확인 하단 일치여부 메세지
  const [passwordCheck, setPasswordChcek] = useState("");
  const passCheck = (e) => {
    const confirmPassword = e.target.value;

    if (client.clientPass !== confirmPassword) {
      setPasswordChcek("비밀번호 불일치");
    } else {
      setPasswordChcek("비밀번호 일치");
    }
  };

  // mbti 선택 및 입력
  const [selectValue, setSelectValue] = useState("");
  const handleInsertMbti = (e) => {
    const selectMbti = e.target.innerText;
    setSelectValue(selectMbti);
    setClient({ ...client, mbti: selectMbti });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !client.clientId ||
      !client.clientPass ||
      !client.clientName ||
      !client.mbti
    ) {
      let missingFields = "";

      if (!client.clientId) {
        missingFields += "아이디 ";
      } else if (!client.clientPass) {
        missingFields += "패스워드 ";
      } else if (!client.clientName) {
        missingFields += "이름 ";
      } else if (!client.mbti) {
        missingFields += "MBTI ";
      }

      if (missingFields) {
        alert(missingFields + "를(을) 입력하세요");
        return;
      }
    }

    // clientPass와 confirmPassword 일치여부 알림창
    const confirmPasswordInput = document.getElementById("confirmPassword"); // 필드에 입력된 값을 가져옴
    const confirmPassword = confirmPasswordInput.value; // confirmPassword 값을 가져와 입력된 값을 넣어줌

    if (!confirmPassword) {
      alert("비밀번호 확인을 입력하세요");
      return;
    }

    if (client.clientPass !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    await axios
      .post("/signup", client, config)
      .then((Response) => {
        navigator("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container join">
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <h1 className="text-center">회원가입</h1>
          <div className="col-md-6 insert-area">
            아이디
            <input
              type="text"
              className="form-control"
              name="clientId"
              pattern="[A-Za-z0-9]{3,8}"
              placeholder="아이디를 입력해주세요(영문,숫자 3~8자)"
              onChange={handleValueChange}
            />
            <button
              type="submit"
              className="btn btn-danger"
              onClick={onCheckId}
            >
              중복확인
            </button>
          </div>

          <div className="col-md-6">
            비밀번호
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
            비밀번호 확인
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              pattern="[a-zA-Z0-9]{8,15}"
              placeholder="비밀번호 확인"
              onChange={passCheck}
            />
            <span
              className={`password-check ${
                passwordCheck === "비밀번호 불일치" ? "password-checkError" : ""
              }`}
            >
              {passwordCheck}
            </span>
          </div>

          <div className="col-md-6">
            이름
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
            MBTI
            <input
              type="text"
              className="form-control"
              name="mbti"
              value={client.mbti}
              placeholder="자신의 MBTI를 선택해주세요"
              readOnly
            />
          </div>

          <div className="col-md-6 Dropdown">
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
            &nbsp;&nbsp;
            <a href="https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC">
              회원님의 MBTI가 궁금하다면?
            </a>
          </div>

          <div className="col-6">
            <button type="submit" className="btn btn-danger">
              가입완료
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
