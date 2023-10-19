import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../toolkit/actions/board_action";
import "./board_style.css";

const BoardWrite = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    subject: "",
    boardContent: "",
    filename: null,
  });

  const { subject, boardContent, filename } = inputs;

  const { omzboardId } = useParams();

  const pv = useSelector((state) => (state.board.pv ? state.board.pv : { currentPage: 1 }));

  const boardDetail = useSelector((state) => state.board.boardDetail);

  const handleValueChange = (e) => {
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
    formData.append("boardContent", boardContent);
    formData.append("clientId", localStorage.getItem("clientId"));

    console.log("filename:", filename);
    if (filename != null) formData.append("filename", filename);

    // 답변글
    if (omzboardId !== undefined) {
      formData.append("omzboardId", boardDetail.omzboardId);
      formData.append("boardRef", boardDetail.boardRef);
      formData.append("reStep", boardDetail.reStep);
      formData.append("reLevel", boardDetail.reLevel);
    }

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
      boardContent: "",
      filename: null,
    });

    navigator(`/board/list/${omzboardId ? pv.currentPage : 1}`);
  };

  return (
    <div className="for-footer-board">
      <div className="write-padding">
        <form onSubmit={onSubmit}>
          <table className="b-form">
            <tbody>
              <tr>
                <td align="center">작성자</td>
                <td>
                  <span className="board-btag">{localStorage.getItem("clientId")}</span>
                </td>
              </tr>
              <tr>
                <td width="20%" align="center">
                  제목
                </td>
                <td>
                  <input className="board-input" type="text" name="subject" size="40" value={subject} placeholder={omzboardId !== undefined ? "답변" : null} onChange={handleValueChange} />
                </td>
              </tr>
              <tr className="write-area">
                <td width="20%" align="center">
                  내용
                </td>
                <td className="b-write">
                  <textarea className="board-input" name="boardContent" rows="13" cols="40" value={boardContent} onChange={handleValueChange}></textarea>
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
          <div className="btn-area">
            <Link className="btn btn-danger btn-l" to={`/board/list/${pv.currentPage}`}>
              리스트
            </Link>
            <input type="submit" className="btn btn-danger" value="등록" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardWrite;
