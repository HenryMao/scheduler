import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  let name = props.selected ? props.name : "";
  return (
    <li className= {interviewerClass}
      key={props.id}
      onClick = {()=>props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />

      {name}
    
    </li>
  );
}
 