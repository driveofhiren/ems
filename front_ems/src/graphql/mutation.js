import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE =gql`
mutation Mutation($employee_details: employee_data) {
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
`;
export const UPDATE_EMPLOYEE = `
  mutation UpdateEmployeeMutation(
    $FirstName: String!
    $LastName: String
    $Age: Int
    $DateOfJoining: String
    $Title: String
    $Department: String
    $EmployeeType: String
    $CurrentStatus: Boolean
  ) {
    updateEmployee_db(
      FirstName: $FirstName
      LastName: $LastName
      Age: $Age
      DateOfJoining: $DateOfJoining
      Title: $Title
      Department: $Department
      EmployeeType: $EmployeeType
      CurrentStatus: $CurrentStatus
    ) {
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
`;

export const DELETE_EMPLOYEE = `
  mutation DeleteEmployeeMutation($FirstName: String!) {
    deleteEmployee_db(FirstName: $FirstName) {
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
`;