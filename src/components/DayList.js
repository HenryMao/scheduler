import React from "react";
import DayListItem from "components/DayListItem"

export default function DayList(props){
  const x = (days) =>{

    let result = days.map(day =>{
      return <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
    })
    return result;
  }

  return(
    <ul>
      {
        x(props.days)
      }

      
      

    </ul>
  )
}