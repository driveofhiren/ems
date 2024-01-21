// EmployeeTable.js
import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { GET_EMPLOYEES } from '../graphql/queries';
import { DELETE_EMPLOYEE } from '../graphql/mutation'; // Import your mutations
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EmployeeTable extends Component {
  constructor() {
    super();
    this.state = {
      datalist: [],
    };
  }

  componentDidMount () {
    // Populate datalist from props
  const  getData =async()=>{
      const data= await  axios.post("http://localhost:4000/", {
        query: `${GET_EMPLOYEES}`
        
      });
      console.log(data.data.data.getAllEmployees_db,"asdsadasdasda")
      this.setState({ datalist: data.data.data.getAllEmployees_db });
      return 
    }
  getData()
 
  }

  handleUpdate = (employee) => {
    // Implement logic to handle updating employee data
    // You can open a modal or navigate to another page for updating the employee
    console.log('Update employee:', employee);
  };
  handleDelete = async (employee, client) => {
  
  
    try {
      await axios.post("http://localhost:4000/", {
        query: `${DELETE_EMPLOYEE}`,
        variables: { FirstName: employee.FirstName },
      });
  
      // Filter the updated list after deletion
      const updatedEmployees = this.state.datalist.filter((emp) => emp.FirstName !== employee.FirstName);
  console.log(updatedEmployees,"dsads")
      // Update the cache with the modified list
      this.setState({datalist:updatedEmployees})
 
  
      console.log('Delete employee:', employee);
      console.log('Updated Employees:', updatedEmployees);
      // alert("Deleted Successful");
    } catch (error) {
      console.error(error);
      alert("Error deleting employee");
    }
  };


  render() {
  
    const { datalist } = this.state;
console.log(this.state,"dwedewdwe")

 
    return (
      <div className="employee-table-container">
        <h2 style={{color:"purple",textAlign:"center"}}>Welcome to Employee Management System</h2>
        <table className="employee-table">
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
              <th>Edit  Delete</th>
            </tr>

            {  datalist.map((Employee) => (
              <tr key={Employee.FirstName}>
                <td>{Employee.FirstName}</td>
                <td>{Employee.LastName}</td>
                <td>{Employee.Age}</td>
                <td>{Employee.DateOfJoining}</td>
                <td>{Employee.Title}</td>
                <td>{Employee.Department}</td>
                <td>{Employee.EmployeeType}</td>
                <td>{Employee.CurrentStatus ? 'Working' : 'Not Working'}</td>
                <td>
                  <Link to={`/edit/${Employee.FirstName}`} ><button>Update</button></Link>
                  
                  <button onClick={() => this.handleDelete(Employee)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default (EmployeeTable);


/*
 render() {
    const { loading, error, getAllEmployees_db } = this.props.data;

    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">Error: {error.message}</p>;

    return (
      <div className="employee-table-container">
        <h2 style={{ color: 'purple', textAlign: 'center' }}>Welcome to Employee Management System</h2>
        <table className="employee-table">
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
              <th>Actions</th>
            </tr>

            {getAllEmployees_db.map((Employee) => (
              <tr key={Employee.FirstName}>
                <td>{Employee.FirstName}</td>
                <td>{Employee.LastName}</td>
                <td>{Employee.Age}</td>
                <td>{Employee.DateOfJoining}</td>
                <td>{Employee.Title}</td>
                <td>{Employee.Department}</td>
                <td>{Employee.EmployeeType}</td>
                <td>{Employee.CurrentStatus ? 'Working' : 'Not Working'}</td>
                <td>
                  <button onClick={() => this.handleUpdate(Employee)}>Update</button>
                  <button onClick={() => this.handleDelete(Employee)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default graphql(GET_EMPLOYEES, {
  options: { fetchPolicy: 'cache-and-network' },
  props: ({ mutate }) => ({
    deleteEmployee: (variables) => mutate({ mutation: DELETE_EMPLOYEE, variables }),
  }),
})(EmployeeTable);
*/
