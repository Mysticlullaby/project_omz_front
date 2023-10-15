import React, { useState } from "react";
import ModalComponent from "./Popup";

function Popup() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>리액트 모달 팝업 예제</h1>
      <button onClick={openModal}>모달 열기</button>
      <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
}

export default Popup;
