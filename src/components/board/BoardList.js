import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { boardActions } from "../../toolkit/actions/board_action";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "./TableRow";
import PageNavigation from "./PageNavigation";
import { boardActions } from "../toolkit/actions/board_action";

const BoardList = () => {
  const { currentPage } = useParams();
  const dispatch = useDispatch();

  const getBoardList = (currentPage) => {
    dispatch(boardActions.getBoardList(currentPage));
  };
  //board_action에서 정의된 getBoardList라는 함수를 여기서 호출해서 쓸수 있게 해주는 거임

  useEffect(() => {
    getBoardList(currentPage);
  }, []);

  const boardList = useSelector((state) => state.board.boardList);
  const pv = useSelector((state) => (state.board.pv ? state.board.pv : { currentPage: 1 }));

  return (
    <div>
      <Link className="btn btn-danger" to="/board/write">
        글쓰기
      </Link>
      <h3 className="text-center">OMZ BOARD</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <colgroup>
          <col width="8%" />
          <col width="*" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {boardList &&
            boardList.map((board) => {
              return <TableRow board={board} key={board.num} />;
              //보드리스트 배열을 map함수를 통해서 순회하는 부분
              //반복해서 보드리스트의 각 요소를 TableRow로 렌더링 해주는거
            })}
        </tbody>
      </table>

      {pv && <PageNavigation getBoardList={getBoardList} />}
    </div>
  );
};

export default BoardList;
