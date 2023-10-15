import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { boardActions } from "../../toolkit/actions/board_action";

const BoardView = () => {
  const { omzboardId } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const boardDetail = useSelector((state) => state.board.boardDetail);
  // const boardFile = useSelector((state) => state.board.boardFile);
  const pv = useSelector((state) => state.board.pv);

  const config = {
    headers: {
      //일단 주석 나중에 질문해
      //Authorization: localStorage.getItem("Authorization"),
    },
  };

  useEffect(() => {
    dispatch(boardActions.getBoardDetail(omzboardId, config));
  }, [omzboardId]);

  const handleDownload = async () => {
    const boardFile = await dispatch(boardActions.getBoardDownload(boardDetail.upload));

    // await dispatch(boardActions.getBoardDownload(boardDetail.upload, config));
    //
    await dispatch(boardActions.getBoardDownload(boardDetail.upload));

    const fileName = boardDetail.upload.substring(boardDetail.upload.indexOf("_") + 1);
    console.log(fileName);

    const url = window.URL.createObjectURL(new Blob([boardFile]), {
      type: "application/octet-stream",
    });

    console.log("url: ", url);
    const link = document.createElement("a"); //<a></a>
    link.href = url; //<a href='첨부파일경로' download='' click= ></a>
    link.setAttribute("download", fileName);
    link.style.cssText = "display:none";
    document.body.appendChild(link);
    link.click();
    link.remove(); // 클릭 이벤트 완료했으므로 지움
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(boardActions.getBoardDelete(omzboardId, config));
    navigator(`/board/list/${pv.currentPage}`);
  };

  return (
    <div className="board-view-table">
      <table className="table board-table-striped" style={{ marginTop: 20 }}>
        <tbody className="board-view-table-body">
          <tr>
            <th width="20%">글쓴이</th>
            <td>{boardDetail.clientId}</td>

            <th width="20%">조회수</th>
            <td>{boardDetail.readCount}</td>
          </tr>

          <tr>
            <th>제목</th>
            <td colSpan="3">{boardDetail.subject}</td>
          </tr>

          <tr>
            <th>내용</th>
            <td className="board-view-content" colSpan="3" style={{ whiteSpace: "pre-line" }}>
              {boardDetail.boardContent}
            </td>
          </tr>

          <tr>
            <th>파일</th>
            <td colSpan="3">
              {boardDetail.upload ? (
                <button className="btn-download" onClick={handleDownload}>
                  {boardDetail.upload.substring(boardDetail.upload.indexOf("_") + 1)}
                </button>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="board-view-btn">
        <Link className="btn btn-danger" to={`/board/list/${pv.currentPage}`}>
          리스트
        </Link>
        &nbsp;
        <Link className="btn btn-danger" to={`/board/write/${omzboardId}`}>
          댓글
        </Link>
        &nbsp;
        {boardDetail.clientId === localStorage.getItem("clientId") && (
          <>
            <Link className="btn btn-danger" to={`/board/update/${omzboardId}`}>
              수정
            </Link>
            <button className="btn btn-danger-delete" onClick={handleDelete}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BoardView;
