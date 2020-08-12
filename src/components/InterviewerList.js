import React, {useState} from "react";
import classnames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';



export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  // const [interviewer, setInterviewer] = useState(0);
    let result = props.interviewers.map(interview =>{
      return <InterviewerListItem
        key={interview.id}
        id={interview.id}
        name={interview.name}
        avatar={interview.avatar}
        selected={interview.id === props.value}
        setInterviewer={props.onChange}
        />
    })

   return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {result}
    </ul>
  </section>
   );
 }