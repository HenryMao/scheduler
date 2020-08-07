const getAppointmentsForDay = function(state, day) {
  let result = [];
  for(let d of state.days){
    if(d.name === day){
      d.appointments.forEach(element => {
        result.push(state.appointments[element]);
      });
      //result.push(state.appointments[d.id]);
    }
  }
  return result;
}

const getInterview = function(state, interview){
  if(!interview){
    return null;
  } else{
    let interviewer = interview.interviewer;
    let student = interview.student;
    for(let inter in state.interviewers){
      if(interviewer === Number(inter)){
        return {student:student, interviewer:state.interviewers[inter]};
      }
    }
  }
  
}

export {getAppointmentsForDay, getInterview}