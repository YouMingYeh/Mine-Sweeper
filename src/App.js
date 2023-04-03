/****************************************************************************
  FileName      [ App.js ]
  PackageName   [ src ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React from "react";
import "./App.css";
import MineSweeper from "./containers/MineSweeper";

const App = () => {
  return (
    <div className="App">
      <div id="image"></div>
      <MineSweeper />
    </div>
  );
};

export default App;
