import { gql } from '@apollo/client';

export const GET_EMPLOYEES = `
  query Query {
    getAllEmployees_db {
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    
    }
  
}`;

export const EMPLOYEE_SEARCH = `
  query EmployeeSearch($FirstName: String!) {
    EmployeeSearch(FirstName: $FirstName) {
      _id
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