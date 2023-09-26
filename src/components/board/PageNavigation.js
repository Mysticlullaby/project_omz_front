import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageNavigation = ({ getBoardList }) => {
  const pv = useSelector((state) => (state.board.pv ? state.board.pv : { currentPage: 1 })); //state에잇는 pv값을 가져온거임

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav arial-label="...">
      <ul className="pagination">
        <li className={pv.startPage <= 1 ? "page-item disabled" : "page-item"}>
          <span className="page-link" onClick={() => getBoardList(pv.startPage - pv.blockPage)}>
            &laquo;
          </span>
        </li>
        {pageNumbers.map((pnum, idx) => (
          <li key={pnum}>
            <span onClick={() => getBoardList(pnum)} className={pv.currentPage === pnum ? "page-item active" : null}>
              <Link to={`/board/list/${pnum}`} className="page-link">
                {pnum}
              </Link>
            </span>
          </li>
        ))}

        <li className={pv.endPage >= pv.totalPage ? "page-item disabled" : "page-item"}>
          <span className="page-link" onClick={() => getBoardList(pv.startPage + pv.blockPage)}>
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
