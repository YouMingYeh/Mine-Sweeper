/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/HomePage.css";
import React, { useEffect, useState, useRef } from "react";
import randomNum from "../util/randomFixSeed";

const HomePage = ({
  startGameOnClick,
  mineNumOnChange,
  boardSizeOnChange,
  mineNum,
  boardSize /* -- something more... -- */,
  emoji,
  setEmoji,
}) => {
  let homePageRef = useRef(null);

  useEffect(() => {
    homePageRef.current.classList += " show";

    // console.log('dawda');
  }, []);

  const [showPanel, setShowPanel] = useState(false); // A boolean variable. If true, the controlPanel will show.

  const [error, setError] = useState(false); // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.
  // const [minesNum, setMinesNum] = useState(8);

  const [showEmojiPanel, setShowEmojiPanel] = useState(false);

  function handleMinesNum(elem) {
    mineNumOnChange(elem.target.value);
  }

  function handleBoardSize(elem) {
    boardSizeOnChange(elem.target.value);
  }
  useEffect(() => {
    if (mineNum >= boardSize * boardSize) setError(true);
    else setError(false);
  }, [mineNum]);
  useEffect(() => {
    if (mineNum >= boardSize * boardSize) setError(true);
    else setError(false);
  }, [boardSize]);

  {
    /* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */
  }

  function RandomEmoji() {
    // return 0;
    let myNum = randomNum(0, 8);

    switch (myNum) {
      case 0:
        return "🐱";
      case 1:
        return "🐶";
      case 2:
        return "🐭";
      case 3:
        return "🐹";
      case 5:
        return "🐰";
      case 6:
        return "🐻";
      case 7:
        return "🐼";
      case 8:
        return "";
    }
    return "";
  }
  // console.log(mineNum)
  return (
    <div ref={homePageRef} className="HomeWrapper">
      <p className="title">MineSweeper</p>
      <button
        className="btn"
        onClick={() => {
          if (error) return;
          startGameOnClick();
        }}
      >
        Start Game
      </button>

      <div className="controlContainer">
        <button
          onClick={() => {
            setShowPanel(!showPanel);
            if (!showPanel) setShowEmojiPanel(false);
          }}
          className="btn"
        >
          Difficulty Adjustment
        </button>

        {/* <div>hi</div> */}
        {showPanel ? (
          <div className="controlWrapper">
            {error ? (
              <div className="error">
                ERROR: Mines Number and Board Size are invalid!
              </div>
            ) : (
              <div></div>
            )}
            <div className="controlPane">
              <div className="controlCol">
                <p className="controlTitle">Mines Number</p>
                <input
                  onChange={handleMinesNum}
                  type="range"
                  step="1"
                  min={1}
                  max={30}
                  // defaultValue={10}
                  value={mineNum}
                  // value={minesNum}
                ></input>
                {error ? (
                  <p className="controlNum" style={{ color: "red" }}>
                    {mineNum}
                  </p>
                ) : (
                  <p className="controlNum">{mineNum}</p>
                )}
              </div>
              <div className="controlCol">
                <p className="controlTitle">Board Size(n x n)</p>
                <input
                  onChange={handleBoardSize}
                  type="range"
                  step="1"
                  min={1}
                  max={15}
                  // defaultValue={8}
                  value={boardSize}
                ></input>
                {error ? (
                  <p className="controlNum" style={{ color: "red" }}>
                    {boardSize}
                  </p>
                ) : (
                  <p className="controlNum">{boardSize}</p>
                )}
              </div>
              <bottun
                className="btn"
                onClick={() => {
                  mineNumOnChange(randomNum(1, 40));
                  boardSizeOnChange(randomNum(1, 15));
                }}
              >
                Random
              </bottun>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <button
        className="btn"
        onClick={() => {
          setShowEmojiPanel(!showEmojiPanel);
          if (!showEmojiPanel) setShowPanel(false);
        }}
      >
        Edit Emoji
      </button>
      {showEmojiPanel ? (
        <div className="controlWrapper">
          <div className="controlPane">
            <p className="controlTitle">Click To Change Emoji</p>
            <bottun className="btn" onClick={() => setEmoji(RandomEmoji)}>
              {emoji}
            </bottun>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {/* Basic TODO:  Implemen start button */}

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
    </div>
  );
};
export default HomePage;
