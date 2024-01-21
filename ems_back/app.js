import { ApolloServer } from '@apollo/server';
import mongoose from "mongoose";
import { startStandaloneServer } from '@apollo/server/standalone';
import { Query } from 'mongoose';
import EmployeeModel from './model/Employee.js';

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Employee {
  
    FirstName: String
    LastName: String
    Age: Int
    DateOfJoining: String
    Title: String
    Department: String
    EmployeeType: String
    CurrentStatus: Boolean
   
  }

  type EmployeeSearch {
    _id:ID
    FirstName: String
    LastName: String
    Age: Int
    DateOfJoining: String
    Title: String
    Department: String
    EmployeeType: String
    CurrentStatus: Boolean
   
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    Employee: [Employee]
    getAllEmployee : [Employee]
    EmployeeSearch (FirstName:String) : EmployeeSearch
    getAllEmployees_db : [Employee]

  }
  input employee_data{
    FirstName: String,
    LastName: String,
    Age: Int,
    DateOfJoining: String,
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: Boolean

}
  type Mutation{
    addEmployee(FirstName: String,
        LastName: String,
        Age: Int,
        DateOfJoining: String,
        Title: String,
        Department: String,
        EmployeeType: String,
        CurrentStatus: Boolean):[Employee]

    addEmployee_db(employee_details:employee_data): Employee
    updateEmployee(
            FirstName: String
            LastName: String
            Age: Int
            DateOfJoining: String
            Title: String
            Department: String
            EmployeeType: String
            CurrentStatus: Boolean
          ): Employee

          updateEmployee_db(
            FirstName: String!
            LastName: String
            Age: Int
            DateOfJoining: String
            Title: String
            Department: String
            EmployeeType: String
            CurrentStatus: Boolean
          ): Employee
    deleteEmployee(FirstName: String): Employee
    deleteEmployee_db(FirstName: String!): Employee
  }
`;
// End==========================Type defs file code======================
// =============================Step 4: Data set defs file code======================

const Employees = [
  {
    FirstName: 'Hiren',
        LastName: 'Gohil',
        Age: 24,
        DateOfJoining: '10/09/2023',
        Title: 'Graphic  Designer',
        Department: 'Design',
        EmployeeType: 'Full Time',
        CurrentStatus: true
  },
];
// End=========================Data set defs file code======================
// =====================Step 5: Resolver for function for each query================
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    Employee: () => Employee,
    getAllEmployee: (parent, args, context, info) => Employees,
    EmployeeSearch: async(parent, args, context, info) => {
      console.log(args.FirstName,"hdssssssssssssbjhjb");
      const Employee = await EmployeeModel.findOne({FirstName : args.FirstName})
     
      console.log(Employee);
      return Employee;
    },
    
    getAllEmployees_db : async (parent,args,context,info)=>{
      try{
      const Employee_from_db =await EmployeeModel.find({}) 
      console.log.apply(Employee_from_db);
  return Employee_from_db}
      catch(err){ console.log(err)}
  },
  },
  Mutation: {
    addEmployee: (parent, args, context, info) => {
      console.log("add Car Mutation");
      const Employee = {
        FirstName: args.FirstName,
        LastName: args.LastName,
        Age: args.Age,
        DateOfJoining: args.DateOfJoining,
        Title: args.Title,
        Department: args.Department,
        EmployeeType: args.EmployeeType,
        CurrentStatus: args.CurrentStatus
      };
      console.log(Employee);
      Employees.push(Employee);
      return Employees;
    },
    updateEmployee_db: async (parent, args, context, info) => {
      try {
        const existingEmployee = await EmployeeModel.findOne({ FirstName: args.FirstName });
  
        if (!existingEmployee) {
          throw new Error(`Employee with FirstName ${args.FirstName} not found`);
        }
  
        // Update only the provided fields
        Object.assign(existingEmployee, args);
        const updatedEmployee = await existingEmployee.save();
  
        return updatedEmployee;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    deleteEmployee_db: async (parent, args, context, info) => {
      try {
        const deletedEmployee = await EmployeeModel.findOneAndDelete({ FirstName: args.FirstName });
  
        if (!deletedEmployee) {
          throw new Error(`Employee with FirstName ${args.FirstName} not found`);
        }
  
        return "Delete";
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    addEmployee_db: async (parent, args, context, info) => {
      try {
        const employee = args.employee_details // Correct the argument name
        const employee_to_insert_in_db = new EmployeeModel(employee);
        const employee_saved = await employee_to_insert_in_db.save();
        console.log(employee_saved);
        console.log(employee_to_insert_in_db);
        return employee_saved;
      } catch (err) {
        console.error(err);
        throw err; // Make sure to rethrow the error
      }
    },
    
    updateEmployee: (parent, args, context, info) => {
        const index = Employees.findIndex((employee) => employee.FirstName === args.FirstName);
        if (index === -1) {
          throw new Error(`Employee with FirstName ${args.FirstName} not found`);
        }
        Employees[index] = {
            ...Employees[index],
            ...args, // Update only the provided fields
          };
    
          return Employees[index]; },
          deleteEmployee: (parent, args, context, info) => {
            const index = Employees.findIndex((employee) => employee.FirstName === args.FirstName);
            if (index === -1) {
              throw new Error(`Employee with FirstName ${args.FirstName} not found`);
            }
      
            const deletedEmployee = Employees.splice(index, 1)[0];
            return deletedEmployee;
          },
  },
};
// End=====================Resolver for function for each query================
// =====================Step 6: Create an instance of ApolloServer================
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);