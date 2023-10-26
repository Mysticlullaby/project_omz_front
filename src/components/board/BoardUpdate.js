import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../toolkit/actions/board_action";
import "./board_style.css";

// 내가 쓴 게시판의 게시글을 수정하는 와중에 뒤로가기를 누르면 '수정사항이 저장되지 않았는데 이 페이지를 나갈거야?' 하고 팝업을 띄우는 작업을 리액트로 하고싶어
const BoardUpdate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { omzboardId } = useParams();

  const [inputs, setInputs] = useState({
    subject: "",
    boardContent: "",
    filename: null,
  });

  const { subject, boardContent, filename } = inputs;

  const boardDetail = useSelector((state) => state.board.boardDetail);
  const pv = useSelector((state) => state.board.pv);

  useEffect(() => {
    setInputs(boardDetail);
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs((prev) => {
      return { ...prev, ...nextState };
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  //게시판에서 취소누르면 기존내용으로 백 해주는부분
  const handleReset = (e) => {
    e.preventDefault();
    setInputs(boardDetail);
  };

  //게시판에서 뒤로 누르면 게시글로 백 해주는 부분
  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("omzboardId", omzboardId);
    formData.append("subject", subject);
    formData.append("boardContent", boardContent);
    formData.append("currentPage", pv.currentPage);

    console.log("filename:", filename);
    if (filename != null) formData.append("filename", filename);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        //Authorization: localStorage.getItem("Authorization"),
      },
    };

    await dispatch(boardActions.getBoardUpdate(formData, config));

    setInputs({
      subject: "",
      boardContent: "",
      filename: null,
    });

    navigator(`/board/list/${pv.currentPage}`);
  };

  return (
    <div className="for-footer-board">
      <div className="write-padding">
        <form name="frm">
          <table className="b-form" style={{ marginTop: 20 }}>
            <tbody>
              <tr>
                <th width="20%">작성자</th>
                <td>{localStorage.getItem("clientId")}</td>
              </tr>

              <tr>
                <th>제목</th>
                <td colSpan="3">
                  <input type="text" name="subject" id="subject" value={subject} onChange={handleValueChange} />
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td colSpan="3">
                  <textarea name="boardContent" id="boardContent" rows="13" cols="40" value={boardContent} onChange={handleValueChange}></textarea>
                </td>
              </tr>

              <tr>
                <th>첨부파일</th>
                <td colSpan="3">
                  <input type="file" name="filename" id="filepath" onChange={handleFileChange} />
                  <span>{boardDetail.upload ? boardDetail.upload.substring(boardDetail.upload.indexOf("_") + 1) : null}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn-area change">
            <button className="btn btn-danger btn-lim" onClick={handleUpdate}>
              수정제출
            </button>
            <button className="btn btn-danger btn-lim2" onClick={handleReset}>  
              수정사항 취소
            </button>
            <button className="btn btn-danger" onClick={handleBack}>
              리스트
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardUpdate;
