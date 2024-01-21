import React, { Component } from "react";
import axios from "axios";
import "./style.css"; 

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  validateForm() {
    const {
      FirstName,
      LastName,
      Age,
      DateOfJoining,
      Title,
      Department,
      EmployeeType,
    } = this.state;

    const validationErrors = {
      FirstName: FirstName ? "" : "First Name is required",
      LastName: LastName ? "" : "Last Name is required",
      Age: (Age >= 20 && Age <= 70) ? "" : "Age must be between 20 and 70",
      DateOfJoining: DateOfJoining ? "" : "Date of Joining is required",
      Title: Title ? "" : "Title is required",
      Department: Department ? "" : "Department is required",
      EmployeeType: EmployeeType ? "" : "Employee Type is required",
    };

    this.setState({ validationErrors });

    return Object.values(validationErrors).every((error) => error === "");
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      const employeeData = {
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Age: parseInt(this.state.Age),
        DateOfJoining: this.state.DateOfJoining,
        Title: this.state.Title,
        Department: this.state.Department,
        EmployeeType: this.state.EmployeeType,
        CurrentStatus: true,
      };

      this.setState({ loading: true, error: null });

      axios
        .post("http://localhost:4000/", {
          query: `
            mutation addEmployee_db($employee_details: employee_data) {
              addEmployee_db(employee_details: $employee_details) {
                FirstName
                LastName
                Age
                DateOfJoining
                Title
                Department
                EmployeeType
                CurrentStatus
              }
            }
          `,
          variables: { employee_details: employeeData },
        })
        .then((response) => {
          this.setState({
            FirstName: "",
            LastName: "",
            Age: "",
            DateOfJoining: "",
            Title: "",
            Department: "",
            EmployeeType: "",
            loading: false,
            error: null,
          });
          window.location.href = '/'
        })
        .catch((error) => {
          this.setState({ loading: false, error: error.message });
          console.error(error);
        });
    }
  }

  render() {
    const { validationErrors } = this.state;

    return (
      <div className="form-container"> 
         <h3 style={{color:"Blue",textAlign:"center"}}>Add new employee here</h3>
    
        <h3 className="text-center">Add Employee</h3>
        <form onSubmit={this.handleSubmit}>
       
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="FirstName"
              value={this.state.FirstName}
              onChange={this.handleInputChange}
            />
            <p className="error-message">{validationErrors.FirstName}</p>
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="LastName"
              value={this.state.LastName}
              onChange={this.handleInputChange}
            />
            <p className="error-message">{validationErrors.LastName}</p>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              name="Age"
              value={this.state.Age}
              onChange={this.handleInputChange}
            />
            <p className="error-message">{validationErrors.Age}</p>
          </div>

          <div className="form-group">
            <label>Date Of Joining</label>
            <input
              type="date"
              className="form-control"
              name="DateOfJoining"
              value={this.state.DateOfJoining}
              onChange={this.handleInputChange}
            />
            <p className="error-message">{validationErrors.DateOfJoining}</p>
          </div>
          <div className="form-group">
            <label>Title</label>
            <select
              className="form-control"
              name="Title"
              value={this.state.Title}
              onChange={this.handleInputChange}
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
              value={this.state.Department}
              onChange={this.handleInputChange}
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
              value={this.state.EmployeeType}
              onChange={this.handleInputChange}
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

        {this.state.loading && <p className="loading-message">Data is Loading...</p>}
        {this.state.error && <p className="error-message">There is an error as below {this.state.error}</p>}
      </div>
    );
  }
}

export default EmployeeCreate;
