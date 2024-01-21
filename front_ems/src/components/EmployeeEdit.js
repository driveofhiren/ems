import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EMPLOYEE_SEARCH, GET_EMPLOYEES } from "../graphql/queries";
import { UPDATE_EMPLOYEE } from "../graphql/mutation";

const EmployeeEdit = (props) => {
  const { SearchName } = useParams();
  const [state, setState] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    DateOfJoining: "",
    Title: "",
    Department: "",
    EmployeeType: "",
    CurrentStatus: true,
    loading: false,
    error: null,
    validationErrors: {
      FirstName: "",
      LastName: "",
      Age: "",
      DateOfJoining: "",
      Title: "",
      Department: "",
      EmployeeType: "",
    },
  });

  useEffect(() => {
 console.log(SearchName,"saxxcassxa")
 getData(SearchName);
  }, []);
  const  getData =async(FirstName)=>{
    const data= await  axios.post("http://localhost:4000/", {
      query: `${EMPLOYEE_SEARCH}`,
      variables: { FirstName },
      
    });
let employee = data.data.data.EmployeeSearch
setState((prevState) => ({
  ...prevState,
  FirstName: employee.FirstName !== undefined ? employee.FirstName : prevState.FirstName,
  LastName: employee.LastName !== undefined ? employee.LastName : prevState.LastName,
  Age: employee.Age !== undefined ? employee.Age : prevState.Age,
  DateOfJoining: employee.DateOfJoining !== undefined ? employee.DateOfJoining : prevState.DateOfJoining,
  Title: employee.Title !== undefined ? employee.Title : prevState.Title,
  Department: employee.Department !== undefined ? employee.Department : prevState.Department,
  EmployeeType: employee.EmployeeType !== undefined ? employee.EmployeeType : prevState.EmployeeType,
  CurrentStatus: employee.CurrentStatus !== undefined ? employee.CurrentStatus : prevState.CurrentStatus,
  // You can omit loading, error, and validationErrors if you don't want to change them
}));
    console.log(data.data.data.EmployeeSearch,state ,"asdsadasdasda")

    return 
     
  }



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      FirstName,
      LastName,
      Age,
      DateOfJoining,
      Title,
      Department,
      EmployeeType,
    } = state;

    const validationErrors = {
      FirstName: FirstName ? "" : "First Name is required",
      LastName: LastName ? "" : "Last Name is required",
      Age: (!isNaN(Age) && Age >= 20 && Age <= 70) ? "" : "Age must be between 20 and 70",
      DateOfJoining: DateOfJoining ? "" : "Date of Joining is required",
      Title: Title ? "" : "Title is required",
      Department: Department ? "" : "Department is required",
      EmployeeType: EmployeeType ? "" : "Employee Type is required",
    };

    setState((prevState) => ({
      ...prevState,
      validationErrors,
    }));

    return Object.values(validationErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
  

      setState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `${UPDATE_EMPLOYEE}`,
          variables: {   FirstName: state.FirstName,
            LastName: state.LastName,
            Age: parseInt(state.Age),
            DateOfJoining: state.DateOfJoining,
            Title: state.Title,
            Department: state.Department,
            EmployeeType: state.EmployeeType,
            CurrentStatus: true },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setState((prevState) => ({
            ...prevState,
            FirstName: "",
            LastName: "",
            Age: "",
            DateOfJoining: "",
            Title: "",
            Department: "",
            EmployeeType: "",
            loading: false,
            error: null,
          }));
          window.location.href = '/';
        })
        .catch((error) => {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: error.message,
          }));
          console.error(error);
        });
    }
  };

  const { validationErrors } = state;

  return (
    <div className="form-container">
      <h3 style={{ color: "Blue", textAlign: "center" }}>Update employee here</h3>

      <h3 className="text-center">Add Employee</h3>
      <form onSubmit={handleSubmit}>
     
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="FirstName"
            disabled
            value={state.FirstName}
            onChange={handleInputChange}
          />
          <p className="error-message">{validationErrors.FirstName}</p>
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="LastName"
            value={state.LastName}
            onChange={handleInputChange}
          />
          <p className="error-message">{validationErrors.LastName}</p>
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="Age"
            value={state.Age}
            onChange={handleInputChange}
          />
          <p className="error-message">{validationErrors.Age}</p>
        </div>

        <div className="form-group">
          <label>Date Of Joining</label>
          <input
            type="date"
            className="form-control"
            name="DateOfJoining"
            value={state.DateOfJoining}
            onChange={handleInputChange}
          />
          <p className="error-message">{validationErrors.DateOfJoining}</p>
        </div>

        <div className="form-group">
          <label>Title</label>
          <select
            className="form-control"
            name="Title"
            value={state.Title}
            onChange={handleInputChange}
          >
            <option value="">Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
          <p className="error-message">{validationErrors.Title}</p>
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            className="form-control"
            name="Department"
            value={state.Department}
            onChange={handleInputChange}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
          <p className="error-message">{validationErrors.Department}</p>
        </div>

        <div className="form-group">
          <label>Employee Type</label>
          <select
            className="form-control"
            name="EmployeeType"
            value={state.EmployeeType}
            onChange={handleInputChange}
          >
            <option value="">Select Employee Type</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
          <p className="error-message">{validationErrors.EmployeeType}</p>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {state.loading && <p className="loading-message">Data is Loading...</p>}
      {state.error && <p className="error-message">There is an error as below {state.error}</p>}
    </div>
  );
};

export default EmployeeEdit;
