/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Board.css";
import Cell from "./Cell";
import Modal from "./Modal";
import Dashboard from "./Dashboard";
import { revealed } from "../util/reveal";
import createBoard from "../util/createBoard";
import React, { useEffect, useRef, useState } from "react";
// import { min } from "cypress/types/lodash";

const Board = ({ boardSize, mineNum, backToHome, emoji }) => {
  let boardRef = useRef(null);
  
  useEffect(() => {
    setTimeout(() => {
      // modalRef.current.classList += " visible";
      boardRef.current.style.opacity = "1";
      // console.log("dawda");
    }, 0);

    // boardRef.current.style.filter+= 'blur(0)';

    // console.log('dawda');
  }, []);
  const [gameStart, setGameStart] = useState(false);
  const [board, setBoard] = useState([]); // An 2-dimentional array. It is used to store the board.

  const [nonMineCount, setNonMineCount] = useState(1); // An integer variable to store the number of cells whose value are not '💣'.
  const [mineLocations, setMineLocations] = useState([]); // An array to store all the coordinate of '💣'.
  const [gameOver, setGameOver] = useState(false); // A boolean variable. If true, means you lose the game (Game over).
  const [remainFlagNum, setRemainFlagNum] = useState(0); // An integer variable to store the number of remain flags.
  const [win, setWin] = useState(false); // A boolean variable. If true, means that you win the game.
  useEffect(() => {
    // console.log("hi");
  }, [board]);

  useEffect(() => {
    // console.log(remainFlagNum)
  }, [remainFlagNum]);
  useEffect(() => {
    // Calling the function
    freshBoard();
  }, []);
  function handleSetBoard(newBoard) {
    setBoard((prev) => {
      return newBoard;
    });
  }

  // Creating a board
  const freshBoard = () => {
    setGameStart(true);
    const newBoard = createBoard(boardSize, mineNum);
    handleSetBoard(newBoard.board);

    setMineLocations(newBoard.mineLocations);
    setRemainFlagNum(mineNum);
    let newNonMineCount = 0;

    newBoard.board.map((e) =>
      e.map((elem) => {
        // console.log(elem);
        if (elem.value !== "💣") {
          newNonMineCount++;
        }
      })
    );

    setNonMineCount(newNonMineCount);

    // Basic TODO: Use `newBoard` created above to set the `Board`.
    // Hint: Read the definition of those Hook useState functions and make good use of them.
  };

  const restartGame = () => {
    setGameStart(false);
    freshBoard();
    setGameOver(false);
    setWin(false);
  };

  // On Right Click / Flag Cell
  const updateFlag = (e, x, y) => {
    // To not have a dropdown on right click

    e.preventDefault();
    // Deep copy of a state
    if (remainFlagNum === 0) return;
    let newBoard = JSON.parse(JSON.stringify(board));
    let newRemainFlagNum = remainFlagNum;

    if (board[x][y].revealed) {
      return;
    }

    if (!newBoard[x][y].flagged) {
      newRemainFlagNum--;
      newBoard[x][y].flagged = true;
    } else {
      newRemainFlagNum++;
      newBoard[x][y].flagged = false;
    }

    // Basic TODO: Right Click to add a flag on board[x][y]
    // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
    setRemainFlagNum(newRemainFlagNum);
    setBoard(newBoard);
    // Update board and remainFlagNum in the end
  };

  const revealCell = (x, y) => {
    if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
    let newBoard = JSON.parse(JSON.stringify(board));

    if (board[x][y].value === "💣") {
      setGameOver(true);
      for (let i = 0; i < mineLocations.length; i++) {
        revealed(
          newBoard,
          mineLocations[i][0],
          mineLocations[i][1],
          nonMineCount
        );
      }
    }
    var res = revealed(newBoard, x, y, nonMineCount);
    setBoard(res.board);
    setNonMineCount(res.newNonMinesCount);

    // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
    // Hint: If `Hit the mine`, check ...?
    //       Else if `Reveal the number cell`, check ...?
    // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
  };

  useEffect(() => {
    if (nonMineCount === 0 && !gameOver) {
      setWin(true);
      setGameOver(true);
    }
  }, [nonMineCount]);
  // console.log("hi");

  return (
    <div ref={boardRef} className="boardPage">
      <div className="boardWrapper">
        <div className="boardContainer">
          <Dashboard
            remainFlagNum={remainFlagNum}
            gameOver={gameOver}
            board={board}
          ></Dashboard>
          {board.map((e, index) => {
            return (
              <div
                key={index}
                id={"row" + index.toString()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {e.map((elem) => {
                  // {console.log(elem.y)}
                  return (
                    <Cell
                      key={10 * elem.x + elem.y}
                      rowIdx={elem.x}
                      colIdx={elem.y}
                      detail={elem}
                      updateFlag={updateFlag}
                      revealCell={revealCell}
                      emoji={emoji}
                    ></Cell>
                  );
                })}
              </div>
            );
          })}
          <div style={{ width: boardSize * 2 + "rem", textAlign: "start" }}>
            Right Click: Reveal cells<br></br>Left Click: Flag a cell<br></br>
            <br></br>
            Hint:<br></br>
            The number in the cell denotes the amount of bombs around the cell !
            <br></br>
            Also, using flag to record SUS locations will be helpful !
          </div>
        </div>
        {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}

        {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}

        {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}

        {gameOver ? (
          <Modal
            gameOver={gameOver}
            restartGame={restartGame}
            backToHome={backToHome}
            win={win}
          ></Modal>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Board;
