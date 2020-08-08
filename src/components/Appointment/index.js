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
import Error from "components/Appointment/Error"
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "ARE YOU SURE YOU WANT TO DELETE?";
const EDIT = "EDIT";
const ERROR_d = "ERROR DELETING";
const ERROR_s = "ERROR SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(response =>{
      transition(SHOW);
    })
    .catch(error=>{
      transition(ERROR_d, true);
      console.log(error);
    })
  }
  function cancel(){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(()=>{
      props.updateLocalInterview(props.id);
      transition(EMPTY);
    })
    .catch((error)=>{
      transition(ERROR_d, true);
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
      {mode === CONFIRM && <Confirm 
      onCancel={()=>{
        back();
      }}
      onConfirm={()=>{
        cancel();
      }}
      message={CONFIRM}/>}
      {mode === EMPTY && <Empty onAdd={()=>{
        transition(CREATE);
      }} />}
      {mode === ERROR_d && <Error
        message={ERROR_d}
        onClose={()=>{
          back();
        }}
      />}
      {mode === ERROR_s && <Error
        message={ERROR_s}
        onClose={()=>{
          back();
        }}
      />}
      {mode === SHOW && <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>{
          transition(CONFIRM)
        }}
        onEdit={()=>{
          transition(EDIT);
        }}
      />
      }
      {mode === EDIT && <Form
        onSave={save}
        onCancel={()=>{
          back();
        }}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
      />}
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