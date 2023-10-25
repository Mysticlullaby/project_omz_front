import { useState } from 'react';
import cookie from 'react-cookies';

function Popup({ isOpen, closeModal }) {
  const [checked, setChecked] = useState(false);

  //저장한 쿠키의 지속 시간, 분 단위로 적어주세요.
  const cookieDuration = 5;

  function onClose() {
    if (checked) {
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + cookieDuration);
      cookie.save('isIgnored', true, {
        path: '/',
        expires
      })
    }

    closeModal();
  }

  return (
    <div style={{ display: isOpen && !cookie.load('isIgnored') ? "block" : "none" }}>
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
          <p className="popup-title">사이트 이용 안내</p>
          <div className="popup-content">
            회원가입 시 본인의 MBTI를 입력하시면
            <br />
            MBTI 별로 선호하는 작품을 추천 받으실 수 있어요!
          </div>
          <div className="btn-hap">
            <div>
              <button className="popup-btn btn-l">
                <a href="https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC">MBTI 검사하러가기</a>
              </button>
            </div>

            <div>
              <button className="popup-btn" onClick={onClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
        <div className="m-3">
          <label>
            <input type='checkbox' checked={checked} onChange={({ target: { checked } }) => setChecked(checked)} />
            <span className="mx-2">{cookieDuration} 분 동안 보지 않기</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Popup;
