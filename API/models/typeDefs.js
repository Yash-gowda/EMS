const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    greetings: String
    welcome(name: String): String
    employees: [Employee] #return array of employees
    employee(id: ID): Employee #return employee data by id
  }

  # Employee object
  type Employee {
    id: ID
    FirstName: String,
    LastName: String,
    Age: Int,
    DateOfJoining: String,
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: Boolean
  }

  # Mutation
  type Mutation {
    create(FirstName: String,
      LastName: String,
      Age: Int,
      DateOfJoining: String,
      Title: String,
      Department: String,
      EmployeeType: String,
      CurrentStatus: Boolean): Employee

    update(id: ID!, FirstName: String,
    LastName: String,
    Age: Int,
    DateOfJoining: String,
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: Boolean): Employee

    delete(id: ID!): String
  }
`;

module.exports = { typeDefs };