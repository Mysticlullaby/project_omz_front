import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../toolkit/actions/board_action";

const BoardWrite = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    subject: "",
    board_content: "",
    filename: null,
  });

  const { subject, board_content, filename } = inputs;

  const { omzboard_id } = useParams();

  const pv = useSelector((state) => (state.board.pv ? state.board.pv : { currentPage: 1 }));

  const boardDetail = useSelector((state) => state.board.boardDetail);

  const handleValueChange = (e) => {
    // let nextState = {};
    // nextState[e.target.name] = e.target.value;
    // setInputs({ ...inputs, ...nextState });

    // setInputs({ ...inputs, [e.target.name]: e.target.value });

    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("boardContent", board_content);
    formData.append("clientId", localStorage.getItem("clientId"));
    // formData.append("client_name", localStorage.getItem("client_name"));

    console.log("filename:", filename);
    if (filename != null) formData.append("filename", filename);

    //답변글이면...
    // if (num !== undefined) {
    //   formData.append("num", boardDetail.num);
    //   formData.append("ref", boardDetail.ref);
    //   formData.append("re_step", boardDetail.re_step);
    //   formData.append("re_level", boardDetail.re_level);
    // }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: localStorage.getItem("Authorization"),
        // 이거 같이넘겨주면 스프링에서 아무리 예외처리 해놔도 삐꾸남
      },
    };

    console.log(localStorage.getItem("Authorization"));
    dispatch(boardActions.getBoardWrite(formData, config));
    // await dispatch(boardActions.getBoardWrite(formData));

    setInputs({
      subject: "",
      board_content: "",
      filename: null,
    });

    navigator(`/board/list/${omzboard_id ? pv.currentPage : 1}`);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>글쓴이</td>
              <td>
                <input type="type" readOnly value={localStorage.getItem("clientId")} name="clientId" />
              </td>
            </tr>
            <tr>
              <td width="20%" align="center">
                제목
              </td>
              <td>
                <input type="text" name="subject" size="40" value={subject} placeholder={omzboard_id !== undefined ? "답변" : null} onChange={handleValueChange} />
              </td>
            </tr>
            <tr>
              <td width="20%" align="center">
                내용
              </td>
              <td>
                <textarea name="board_content" rows="13" cols="40" value={board_content} onChange={handleValueChange}></textarea>
              </td>
            </tr>

            <tr>
              <td width="20%" align="center">
                첨부파일
              </td>
              <td>
                <input type="file" name="filename" id="filepath" onChange={handleFileChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <Link className="btn btn-primary" to={`/board/list/${pv.currentPage}`}>
          리스트
        </Link>
        <input type="submit" className="btn btn-primary" value="등록" />
      </form>
    </>
  );
};

export default BoardWrite;
