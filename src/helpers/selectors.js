export function getAppointmentsForDay(state, day) {
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