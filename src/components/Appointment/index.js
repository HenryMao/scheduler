import React from "react";
import classnames from "classnames";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "ARE YOU SURE YOU WANT TO DELETE"
export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(response =>{
      transition(SHOW);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  function cancel(){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(()=>{
      transition(EMPTY);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // let display = props.interview ? <Show
  // Student={props.interview.student}
  // interviewer={props.interview.interviewer}
  // /> : <Empty/>
  
   return (
    
    <article className="appointment">
      <Header
      time = {props.time}
      />
      {mode === CONFIRM && <Confirm message={CONFIRM}/>}
      {mode === EMPTY && <Empty onAdd={()=>{
        transition(CREATE);
      }} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>{
          cancel()
        }}
      />
      )}
      {mode === CREATE && <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={()=>{
          back();
        }
        }
        />}
        {mode === SAVING && <Status 
          message={SAVING}
        />}
        {mode === DELETING && <Status 
          message={DELETING}
        />}
    </article>
   );
 }