import React, { useEffect, useState } from "react";
import "./App.css";
var pomodoro = 0;
function App() {
  const [workduration, setWorkDuration] = useState(25);
  const [breakduartion, setBreakDuration] = useState(5);
  const [worksecond, setWorkSecond] = useState(1500);
  const [breaksecond, setBreakSecond] = useState(300);
  const [type, setType] = useState("work");
  const [startFlag, setStartFlag] = useState(false);
  const [stopFlag, setStopFlag] = useState(true);
  const [resetFlag, setResetFlag] = useState(true);

  const displayTime = (props) => {
    let hrs = parseInt(props / 60);
    let min = parseInt(props % 60);
    if (hrs < 10) {
      hrs = "0" + hrs;
    }
    if (min < 10) {
      min = "0" + min;
    }
    return hrs + " : " + min;
  };
  console.log(worksecond +" "+ breaksecond)

  useEffect(()=>{
    if(stopFlag === false && type === "work"){
      if(worksecond > 0){
        const timeId = setTimeout(()=>{ 
          setWorkSecond(worksecond-1);
        }, 1000)
        return ()=>clearTimeout(timeId); 
      }
    }
    if(worksecond === 0 && pomodoro < 3){
      pomodoro++;
      alert("Break_time!!");
      setWorkSecond(workduration*60);
      setType("break");
    }
    else if (worksecond === 0 && pomodoro === 3) {
      pomodoro++;
      alert("Long_Break_time!!");
      setWorkSecond(workduration * 60);
      setType("break");
      setBreakSecond(30*60);
      pomodoro = 0;
    }
    if(stopFlag ===false && type === "break"){
      if(breaksecond > 0){
        const timeId = setTimeout(()=>{
          setBreakSecond(breaksecond-1);
        }, 1000);
        return ()=>clearTimeout(timeId);
      }
    }
    if(breaksecond === 0){
      setBreakSecond(breakduartion*60);
      setType("work");
    }
  }, [stopFlag, type, worksecond, breaksecond, workduration, breakduartion])

  const run = () => {
    setStopFlag(false);
    setStartFlag(true);
    setResetFlag(false);
  };

  const pause = () => {
    setStopFlag(true);
    setStartFlag(false);
  };

  const restore = () => {
    setStartFlag(false);
    setStopFlag(true);
    setResetFlag(true);
    setBreakSecond(5*60);
    setWorkSecond(25*60);
    setType("work");
    setWorkDuration(25);
    setBreakDuration(5);
  };

  const setDuration = (e) => {
    e.preventDefault();
    setWorkSecond(workduration * 60);
    setBreakSecond(breakduartion * 60);
    setResetFlag(false);
    setStartFlag(false);
    setStopFlag(true);
    setType("work");
    pomodoro = 0;
  };

  return (
    <div className="App">
      <div className="clock">
        <h1 className="timer">
          {type === "work"
            ? displayTime(worksecond)
            : displayTime(breaksecond)}
        </h1>
        <h3>{type === "work" ? "work-time" : "break-time"}</h3>
      </div>

      <div className="control">
        <button
          data-testid="start-btn"
          onClick={() => run()}
          disabled={startFlag}
        >
          Start
        </button>
        <button
          data-testid="stop-btn"
          onClick={() => pause()}
          disabled={stopFlag}
        >
          Stop
        </button>
        <button
          data-testid="reset-btn"
          onClick={() => restore()}
          disabled={resetFlag}
        >
          Reset
        </button>
      </div>

      <div className="parameters">
        <form onSubmit={(e) => setDuration(e)}>
          <input
            data-testid="work-duration"
            type="number"
            placeholder="work duration"
            required
            value={workduration}
            onChange={(e) => setWorkDuration(e.target.value)}
          />
          <input
            data-testid="break-duration"
            type="number"
            placeholder="break duration"
            required
            value={breakduartion}
            onChange={(e) => setBreakDuration(e.target.value)}
          />
          <button type="submit">set</button>
        </form>
      </div>
    </div>
  );
}

export default App;
