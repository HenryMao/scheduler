import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList.js";
import "components/Application.scss";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
export default function Application(props) {

  const {setDay, state, updateLocalInterview, bookInterview} = useApplicationData(); 
  
  
  function cancelInterview(id){
    return axios.delete(`/api/appointments/${id}`);
  }

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  const interviewers = getInterviewersForDay(state, state.day);
  return (<Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={interviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    updateLocalInterview={updateLocalInterview}
  />)
  });

  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered"></hr>
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule} 
        <Appointment key="last" time="5pm" 
        bookInterview={bookInterview}
        />
      </section>
    </main>
  );
}
