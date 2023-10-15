import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // 모달을 사용할 루트 요소를 설정

const ModalComponent = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="모달 팝업">
      <h2>모달 팝업 내용</h2>
      <p>이 부분에 모달 내용을 추가하세요.</p>
      <button onClick={closeModal}>닫기</button>
    </Modal>
  );
};

export default ModalComponent;
