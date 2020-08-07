import React,{useState, useEffect} from "react";


const useVisualMode = (initial)=>{
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode) {
    console.log(history);
    setHistory((cs)=>{
      return cs.concat(newMode);
    });
    setMode(newMode);
  } 
  function back(){
    setHistory((cs)=>{
      return cs.slice(0, cs.length-1);
    });
    if(history.length>1){
      setMode(history[history.length-2]);
    } else{
      setMode(mode);
    }
    
  }
  return {mode, transition, back};
}

export default useVisualMode;