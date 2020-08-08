import React,{useState, useEffect} from "react";


const useVisualMode = (initial)=>{
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {

    if(replace){
      setHistory((cs)=>{
        return cs.slice(0,cs.length-1).concat(newMode);
      });
    } else {
      setHistory((cs)=>{
        return cs.concat(newMode);
      });
    }
    setMode(newMode);
  } 
  function back(){
    setHistory((cs) =>{
      return cs.slice(0, cs.length-1);
    });
    console.log(history);
    if(history.length>1){
      setMode(history[history.length-2]);
    }
  }
  return {mode, transition, back};
}

export default useVisualMode;

