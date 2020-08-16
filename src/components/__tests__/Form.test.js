import React from "react";

import { render, cleanup, getAllByTestId } from "@testing-library/react";

import Form from "components/Appointment/Form";
import { fireEvent } from "@testing-library/react";
import InterviewerListItem from "components/InterviewerListItem";
/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
/*
  We import the component that we are testing
*/

afterEach(cleanup);




describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
    
  ];
 
  it("renders without crashing", () => {
    render(<Form interviewers={interviewers}/>);
  });

  
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
  
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
 
  

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
      /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    expect(getByText(/student name or interviewer cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
    
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    const {li, img} = render(<InterviewerListItem
    id = {interviewers[0].id}
    name = {interviewers[0].name}
    avatar = {interviewers[0].avatar}
    selected = {true}
    />);
    
    fireEvent.click(getByText("Save"));
    
    expect(getByText(/student name or interviewer cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText("Save"));
    
    expect(queryByText(/student name or interviewer cannot be blank/i)).toBeInTheDocument();
    
    expect(onSave).not.toHaveBeenCalled();
    //expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
    
    fireEvent.click(getByText("Save"));
    
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByText("Cancel"));
    
    expect(queryByText(/student name or interviewer cannot be blank/i)).toBeInTheDocument();
    
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});