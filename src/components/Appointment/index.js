import React from "react";
import classnames from "classnames";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // let display = props.interview ? <Show
  // Student={props.interview.student}
  // interviewer={props.interview.interviewer}
  // /> : <Empty/>
  
   return (
    
    <article className="appointment">
      <Header
      time = {props.time}
      />
      {mode === EMPTY && <Empty onAdd={()=>{
        transition(CREATE);
      }} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
      )}
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onSave={props.onSave}
        onCancel={()=>{
          back();
        }}
        />}
    </article>
   );
 }