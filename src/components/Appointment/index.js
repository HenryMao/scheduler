import React from "react";
import classnames from "classnames";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
  let display = props.interview ? <Show
  Student={props.interview.student}
  interviewer={props.interview.interviewer}
  /> : <Empty/>
  
   return (
    
    <article className="appointment">
      <Header
      time = {props.time}
      />
      {display}
    </article>
   );
 }