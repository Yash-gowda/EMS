const { Employee } =  require("./models/EmployeeDB.js");
const resolvers = {
    Query: {
        greetings: () => "GraphQL is Awesome",
        welcome: (parent, args) => `Hello ${args.name}`,
        // tasks: async () => await Task.find({}),
        // task: async (parent, args) => await Task.findById(args.id),
        employees: async () => await Employee.find({}),
        employee: async (parent, args) => await Employee.findById(args.id),
    },
    Mutation: {
        create: async (parent, args) => {
          console.log(args);
          const { FirstName,
            LastName,
            Age,
            DateOfJoining,
            Title,
            Department,
            EmployeeType,
            CurrentStatus } = args;
          const newEmp = new Employee({
            FirstName,
            LastName,
            Age,
            DateOfJoining,
            Title,
            Department,
            EmployeeType,
            CurrentStatus
          });
          await newEmp.save();
          return newEmp;
        },
        update: async (parent, args) => {
          const { id, Title, Department, CurrentStatus } = args;
          const update = {};
    
          if (Title !== undefined) update.Title = Title;
          if (Department !== undefined) update.Department = Department;
          if (CurrentStatus !== undefined) update.CurrentStatus = CurrentStatus;
    
          const updatedEmployee = await Employee.findByIdAndUpdate(id, { $set: update }, { new: true });
          if (!updatedEmployee) {
            throw new Error("Employee not found.");
          }
          return updatedEmployee;
        },
        delete: async (parent, args) => {
          const { id } = args;
          const deletedEmployee = await Employee.findOneAndDelete({ _id: id });
          if (!deletedEmployee) {
            throw new Error("Employee not found or already deleted");
          }
          return "Employee data deleted successfully";
        },
      },
  };
  
  module.exports = { resolvers };