/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  board[x][y].revealed = true;
  newNonMinesCount--;
  var res;
  if (board[x][y].value === 0) {
    if (x > 0 && !board[x - 1][y].revealed) {
      res = revealed(board, x - 1, y, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (x < board.length - 1 && !board[x + 1][y].revealed) {
      res = revealed(board, x + 1, y, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (y > 0 && !board[x][y - 1].revealed) {
      var res = revealed(board, x, y - 1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (y < board.length - 1 && !board[x][y + 1].revealed) {
      var res = revealed(board, x, y + 1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (x > 0 && y > 0 && !board[x - 1][y - 1].revealed) {
      var res = revealed(board, x - 1, y - 1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (x < board.length - 1 && y > 0 && !board[x + 1][y - 1].revealed) {
      var res = revealed(board, x + 1, y - 1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (x > 0 && y < board.length - 1 && !board[x - 1][y + 1].revealed) {
      var res = revealed(board, x - 1, y + 1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
    if (
      x < board.length - 1 &&
      y < board.length - 1 &&
      !board[x + 1][y + 1].revealed
    ) {
      var res = revealed(board, x + 1, y + 1, newNonMinesCount);
      board = res.board;
      newNonMinesCount = res.newNonMinesCount;
    }
  }
  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.

  return { board, newNonMinesCount };
};
