/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState, useSpring, useRef } from "react";
// import {Animated } from 'react-native';
import "./css/Dashboard.css";
let timeIntervalId;
let timeCnt = 0;
let positive = 1;
export default function Dashboard({ remainFlagNum, gameOver, board }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);
  // const [open, setOpen] = useState(false);
  let timerRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      console.log(timerRef.current);
      positive = -positive;
      let degree = time < 30 ? positive * time : positive * 30;
      if (timerRef)
        timerRef.current.style.transform =
          "rotate(" + degree.toString() + "deg)";
    }, 0);
    setTimeout(() => {
      console.log(timerRef.current);
      positive = -positive;
      let degree = time < 30 ? positive * time : positive * 30;
      if (timerRef.current)
        timerRef.current.style.transform =
          "rotate(" + degree.toString() + "deg)";
    }, 500);
  }, [time]);
  // const props = useSpring({ width: open ? 240 : 40 });

  // useEffect(()=>{
  //   setInterval(()=>{
  //     setOpen(!open)
  //     // props.width.to((x)=>x.toFixed(0))
  //   },1000)
  // },[])
  // Advanced TODO: Implement the timer on the Dashboard
  {
    /* Useful Hint: Try to understand the difference between time and sTime. */
  }

  useEffect(() => {
    if (!gameOver) {
      setTimeout(() => {
        setTime((prev) => {
          prev = prev + 1;
          return prev;
        });
      }, 1000);
    }
  }, [time]);

  useEffect(() => {
    setTime(0);
    setSTime(time);
    // setTime(timeCnt)
  }, [gameOver]);

  return (
    <div className="dashBoard">
      <div id="dashBoard_col1">
        <div className="dashBoard_col">
          <p className="icon">🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id="dashBoard_col2">
        <div className="dashBoard_col">
          <p ref={timerRef} className="icon">
            ⏰
          </p>
          {gameOver ? sTime : time}
        </div>
      </div>
    </div>
  );
}
