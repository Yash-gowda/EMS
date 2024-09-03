import React, { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Switch, Table, TableCaption,
  TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import EmployeeUpdate from './EmpUpdate';
import EmployeeSearch from './EmpSearch';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../mutation';

const EmployeeTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [GET_EMPLOYEES],
  });
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showRetirements, setShowRetirements] = useState(false);
  const toast = useToast();


  useEffect(() => {
    if (!loading && !error && data && data.employees) {
      setEmployees(data.employees);
    }
  }, [data, loading, error]);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error! {error.message}</Box>;

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const onDelete = async (employee) => {
    if (employee.CurrentStatus) {
      toast({
        title: "CAN’T DELETE EMPLOYEE",
        description: "STATUS ACTIVE",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await deleteEmployee({ variables: { id: employee.id } });
      toast({
        title: 'Employee Deleted',
        description: `Employee has been successfully deleted.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Deletion Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onEdit = (employeeToEdit) => {
    setEditingEmployee(employeeToEdit);
    onOpen();
  };

  const handleSearch = (criteria) => {
    if (criteria.searchText.length > 0) {
      const filteredEmployees = employees.filter(employee => {
        for (const key in employee) {
          if (key !== "__typename" && employee[key] &&
            employee[key].toString().toLowerCase().includes(criteria.searchText.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
      setEmployees(filteredEmployees);
    } else {
      setEmployees(data.employees);
    }
  };
  const onToggleReitrement = () => {
    setShowRetirements(!showRetirements)

    if (!showRetirements) {
      debugger
      setEmployees(employees.filter(employee => employee.Age >= 64));
    } else {
      setEmployees(data.employees);
    }
  }
  return (
    <Box overflowX="auto">
      <EmployeeSearch onCriteriaChange={handleSearch} />

      {isOpen && (
        <EmployeeUpdate
          isOpen={isOpen}
          onClose={onClose}
          employeeToEdit={editingEmployee}
        />
      )}
      <FormControl display="flex" alignItems="center" mb="0" mt={'20px'}>
        <FormLabel htmlFor="retirement-toggle" mb="0">
          Show Upcoming Retirements
        </FormLabel>
        <Switch id="retirement-toggle" size='lg' isChecked={showRetirements} onChange={onToggleReitrement} />
      </FormControl>

      <TableContainer>
        <Table variant="striped">
          <TableCaption placement="top" fontSize="2xl" fontWeight="bold">
            {showRetirements ? "Upcoming Retirements" : "Employee List"}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Age</Th>
              <Th>Date Of Joining</Th>
              <Th>Title</Th>
              <Th>Department</Th>
              <Th>Employee Type</Th>
              <Th>Current Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee, index) => (
              <Tr key={index}>
                <Td _hover={{ color: 'red.600', cursor: 'pointer' }}>
                  <Link to={`/employee/${employee.id}`}>
                    {employee.FirstName}
                  </Link>
                </Td>
                <Td _hover={{ color: 'red.600', cursor: 'pointer' }}>
                  <Link to={`/employee/${employee.id}`}>
                    {employee.LastName}
                  </Link>
                </Td>
                <Td>{employee.Age}</Td>
                <Td>{formatDate(employee.DateOfJoining)}</Td>
                <Td>{employee.Title}</Td>
                <Td>{employee.Department}</Td>
                <Td>{employee.EmployeeType}</Td>
                <Td>{employee.CurrentStatus === true ? "Working" : "Retired"}</Td>
                <Td>
                  <Button
                    mr={2}
                    colorScheme="blue"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => onDelete(employee)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeTable;
