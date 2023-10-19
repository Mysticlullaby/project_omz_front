import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Delete = () => {
  const navigator = useNavigate();

  const [client, setClient] = useState({
    clientId: "",
    clientPass: "",
    clientName: "",
  });

  const { clientId, clientPass, clientName } = client;

  const handleValueChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("authorization"),
    },
  };

  // 백엔드에서 회원 이름 불러오기
  const info = async () => {
    await axios
      .get(`/getClientName/${localStorage.getItem("clientId")}`, config)
      .then((Response) => {
        setClient({ ...Response.data, clientPass: "" });
        console.log(Response.data);
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
    // console.log("내가 입력한 비밀번호: ", clientPass);
    // if (!clientPass) {
    //   alert("비밀번호를 입력해주세요");
    //   return;
    // }

    await axios
      .post("/delete", client, config)
      .then((Response) => {
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container delete">
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <h1 className="text-center mx-auto client">회원탈퇴</h1>
          <div className="col-md-6 insert-area">
            아이디
            <input
              type="text"
              className="form-control"
              name="clientId"
              value={clientId}
              readOnly
            />
          </div>

          <div className="col-md-6">
            이름
            <input
              type="text"
              className="form-control"
              name="clientName"
              value={clientName}
              readOnly
            />
          </div>

          {/* <div className="col-md-6">
            비밀번호
            <input
              type="password"
              className="form-control"
              name="clientPass"
              onChange={handleValueChange}
            />
          </div> */}

          <div className="col-12">
            <button type="submit" className="btn btn-danger">
              회원탈퇴
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Delete;
