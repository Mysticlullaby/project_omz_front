function Popup({ isOpen, closeModal }) {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          zIndex: 998,
        }}
      ></div>

      <div
        className="card"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxWidth: "100%",
          maxHeight: "90%",
          overflowY: "auto",
          backgroundColor: "white",
          zIndex: 999,
        }}
      >
        <div className="popup-div-a">
          <p className="popup-title">나는ㄴ팝업</p>

          <div>
            회원가입 시 본인의 MBTI를 입력하시면
            <br />
            MBTI 별로 선호하는 작품의 순위를 추천 받으실 수 있어요!
          </div>

          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
