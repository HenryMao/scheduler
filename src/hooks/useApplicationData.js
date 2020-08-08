import React,{useState, useEffect} from "react";
import axios from "axios";
const useApplicationData = function(){
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


 
  function saveSuccess(id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({
    //   ...state,
    //   appointments
    // });

    let spots;
    let newDays = [...state.days];
    let index;

      for(let i = 0; i<state.days.length; i++){
        if(state.days[i].name === state.day){
        spots = state.days[i].spots - 1;
        newDays[i] = {...state.days[i], spots}
        }
      }
    console.log(state.days);
    console.log(newDays);
    setState({
      ...state, appointments: appointments, days: newDays
    })
  }
  function editSuccess(id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState({
    //   ...state,
    //   appointments
    // });

    let spots;
    let newDays = [...state.days];
    let index;

      for(let i = 0; i<state.days.length; i++){
        if(state.days[i].name === state.day){
        spots = state.days[i].spots;
        newDays[i] = {...state.days[i], spots}
        }
      }

    setState({
      ...state, appointments: appointments, days: newDays
    })
  }
  function updateLocalInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let spots;
    let newDays = [...state.days];
    let index;

      for(let i = 0; i<state.days.length; i++){
        if(state.days[i].name === state.day){
        spots = state.days[i].spots + 1;
        newDays[i] = {...state.days[i], spots}
        }
      }
    console.log(state.days);
    setState({
      ...state, appointments: appointments, days: newDays
    })
  }


  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")), 
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then((all)=>{
        setState(prev => ({ ...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data  
        }));

    })  

  },[]);

  return {setDay, state, updateLocalInterview, editSuccess, saveSuccess};

}

export default useApplicationData;