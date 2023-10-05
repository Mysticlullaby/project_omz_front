import axios from "axios";
import { boardReducers } from "../reducers/board_reducer";

function getBoardList(currentPage) {
  return async (dispatch) => {
    const data = await axios
      //아래줄의 요청이 성공하면 응답데이터가 data에 저장됨 /
      .get(`/board/list/${currentPage}`)
      //응답이 성공하면 response의 data속성을 추출함 /
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
    // dispatch({ type: "list", payload: data });
    dispatch(boardReducers.getBoardList({ data })); //slice를 거쳐 store에 저장
    //디스패치 함수를 사용하여 상태를 업데이트 함.
  };
}

function getBoardDetail(omzboardId, config) {
  // alert("omzboardId", omzboardId);
  return async (dispatch) => {
    const data = await axios.get(`http://127.0.0.1:8090/board/view/${omzboardId}`, config).then((response) => response.data);
    dispatch(boardReducers.getBoardDetail({ data }));
  };
}

function getBoardWrite(formData, config) {
  return async () => {
    await axios.post("/board/write", formData, config).then((response) => response.data);
  };
}

function getBoardDownload(upload) {
  return async (dispatch) => {
    const data = await axios
      .get(`/board/contentdownload/${upload}`, {
        ////////////BoardView.js에 정의되어 있음//////////////////
        headers: {
          //Authorization: localStorage.getItem("Authorization"),
        }, //////////////////////////////////////////////////////
        responseType: "blob",
        //blob: 멀티미디어 데이터
      })
      .then((response) => response.data);
    dispatch(boardActions.getBoardDownload(data));

    return data;
  };
}

function getBoardUpdate(formData, config) {
  return async () => {
    await axios.put(`/board/update`, formData, config).then((response) => response.data);
  };
}

function getBoardDelete(omzboardId, config) {
  return async (dispatch) => {
    await axios.delete(`/board/delete/${omzboardId}`, config).then((response) => response.data);
  };
}

export const boardActions = {
  getBoardList,
  getBoardDetail,
  getBoardWrite,
  getBoardDownload,
  getBoardUpdate,
  getBoardDelete,
};
