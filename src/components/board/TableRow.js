import { Link } from "react-router-dom";

//const TableRow = (props) => {
//const { board } = props;

const TableRow = ({ board }) => {
  return (
    <tr>
      <td>{board.omzboardId}</td>
      <td>
        {board.reLevel > 0 ? (
          <>
            <img alt="level" src="/images/level.gif" width={20 * board.reLevel} height="15" />
            <img alt="re" src="/images/re.gif" />
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
