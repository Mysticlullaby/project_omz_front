// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { boardActions } from "../../toolkit/actions/board_action";

// const BoardUpdate = () => {
//   const navigator = useNavigate();
//   const dispatch = useDispatch();
//   const { num } = useParams();

//   const [inputs, setInputs] = useState({
//     subject: "",
//     content: "",
//     filename: null,
//   });

//   const { subject, content, filename } = inputs;

//   const boardDetail = useSelector((state) => state.board.boardDetail);
//   const pv = useSelector((state) => state.board.pv);

//   useEffect(() => {
//     setInputs(boardDetail);
//   }, []);

//   const handleValueChange = (e) => {
//     e.preventDefault();
//     let nextState = {};
//     nextState[e.target.name] = e.target.value;
//     setInputs((prev) => {
//       return { ...prev, ...nextState };
//     });
//   };

//   const handleFileChange = (e) => {
//     e.preventDefault();
//     setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
//   };

//   //게시판에서 취소누르면 기존내용으로 백 해주는부분
//   const handleReset = (e) => {
//     e.preventDefault();
//     setInputs(boardDetail);
//   };

//   //게시판에서 뒤로 누르면 게시글로 백 해주는 부분
//   const handleBack = (e) => {
//     e.preventDefault();
//     navigator(-1);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("num", num);
//     formData.append("subject", subject);
//     formData.append("content", content);
//     formData.append("currentPage", pv.currentPage);

//     console.log("filename:", filename);
//     if (filename != null) formData.append("filename", filename);

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: localStorage.getItem("Authorization"),
//       },
//     };

//     await dispatch(boardActions.getBoardUpdate(formData, config));

//     setInputs({
//       subject: "",
//       content: "",
//       filename: null,
//     });

//     navigator(`/board/list/${pv.currentPage}`);
//   };

//   return (
//     <>
//       <form name="frm">
//         <table className="table table-striped" style={{ marginTop: 20 }}>
//           <tbody>
//             <tr>
//               <th width="20%">글쓴이</th>
//               <td>{boardDetail["membersDTO"] ? boardDetail["membersDTO"]["memberName"] : null}</td>
//               <th width="20%">등록일</th>
//               <td>{boardDetail.reg_date}</td>
//             </tr>

//             <tr>
//               <th>제목</th>
//               <td colSpan="3">
//                 <input type="text" name="subject" id="subject" value={subject} onChange={handleValueChange} />
//               </td>
//             </tr>
//             <tr>
//               <th>내용</th>
//               <td colSpan="3">
//                 <textarea name="content" id="content" rows="13" cols="40" value={content} onChange={handleValueChange}></textarea>
//               </td>
//             </tr>

//             <tr>
//               <th>첨부파일</th>
//               <td colSpan="3">
//                 <input type="file" name="filename" id="filepath" onChange={handleFileChange} />
//                 <span>{boardDetail.upload ? boardDetail.upload.substring(boardDetail.upload.indexOf("_") + 1) : null}</span>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <button className="btn btn-primary" onClick={handleUpdate}>
//           수정
//         </button>
//         <button className="btn btn-primary" onClick={handleReset}>
//           취소
//         </button>
//         <button className="btn btn-primary" onClick={handleBack}>
//           뒤로
//         </button>
//       </form>
//       ;{" "}
//     </>
//   );
// };

// export default BoardUpdate;
