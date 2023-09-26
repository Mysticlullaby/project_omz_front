import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  boardList: [],
  pv: { currentPage: 1 },
  boardDetail: {},
  boardFile: null,
};

//슬라이스는 리덕스 상태와 액션 관련 로직을 결합한 것 / 액션과 리듀서를 하나로 묶어서 관리
const boardSlice = createSlice({
  name: "board", //슬라이스 이름을 지정해줌
  initialState,
  reducers: {
    getBoardList(state, action) {
      console.log("boardList", action.payload.data.boardList);
      state.boardList = action.payload.data.boardList;
      state.pv = action.payload.data.pv;
      //뒤쪽에서 받은 데이터를 앞의 state에 할당함
    },

    getBoardDetail(state, action) {
      state.boardDetail = action.payload.data;
    },
  },
});

export const boardReducers = boardSlice.actions;
export default boardSlice;
