/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Modal.css";
import React, { useEffect, useState, useRef } from "react";

export default function Modal({ gameOver, restartGame, backToHome, win }) {
  const [render, setRender] = useState(false);
  let [myStyle, setMyStyle] = useState(0);
  let modalRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
    setTimeout(() => {
      modalRef.current.classList += " visible";
      console.log("dawda");
    }, 0);
  }, []);
  return (
    <div ref={modalRef} className={`modal`}>
      <div className="modalWrapper"></div>
      <div className="modalContent">
        <div className="modalResult">{win ? <p>WIN</p> : <p>Game Over</p>}</div>
        <div className="modalBtnWrapper">
          <div className="modalBtn" onClick={restartGame}>
            Try again
          </div>
          <div className="modalBtn" onClick={backToHome}>
            backToHome
          </div>
        </div>
      </div>
      <div className="modalWrapper"></div>
    </div>
    // Advanced TODO: Implement the structure of Modal
    // Useful Hint: style = {{opacity: 1 or 0 }}
  );
}
