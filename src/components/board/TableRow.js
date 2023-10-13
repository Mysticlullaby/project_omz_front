import { Link } from "react-router-dom";

const TableRow = ({ board }) => {
  return (
    <tr className="b-List">
      <td>{board.omzboardId}</td>
      <td>
        {board.reLevel > 0 ? (
          <>
            <img alt="level" src="/images/level.gif" width={20 * board.reLevel} height="15" />
            <img alt="re" src="/images/re.png" width={20} height={15} />
          </>
        ) : null}
        <Link to={`/board/view/${board.omzboardId}`}> {board.subject}</Link>
      </td>

      <td>{board.clientId}</td>

      <td>{board.readCount}</td>
    </tr>
  );
};

export default TableRow;
