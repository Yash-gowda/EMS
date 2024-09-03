import { gql } from "@apollo/client";
export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    employee(id: $id) {
      id
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
export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      FirstName,
      LastName,
      Age,
      DateOfJoining,
      Title,
      Department,
      EmployeeType,
      CurrentStatus
    }
  }
`;
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($FirstName: String!, $LastName: String!, $Age: Int!, $DateOfJoining: String!, $Title: String!, $EmployeeType: String!, $Department: String!, $CurrentStatus: Boolean!) {
    create(FirstName: $FirstName, LastName: $LastName, Age: $Age, DateOfJoining: $DateOfJoining, Title: $Title, EmployeeType: $EmployeeType, Department: $Department, CurrentStatus: $CurrentStatus) {
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

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $FirstName: String, $LastName: String, $Age: Int, $DateOfJoining: String, $Title: String, $EmployeeType: String, $Department: String, $CurrentStatus: Boolean) {
    update(id: $id, FirstName: $FirstName, LastName: $LastName, Age: $Age, DateOfJoining: $DateOfJoining, Title: $Title, EmployeeType: $EmployeeType, Department: $Department, CurrentStatus: $CurrentStatus) {
      id
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
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    delete(id: $id) 
    
  }
`;