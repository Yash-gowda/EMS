import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, VStack, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useQuery } from "@apollo/client";
import {GET_EMPLOYEE_DETAILS} from '../mutation'

const EmployeeDetails = () => {
  let { id } = useParams();
  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id }
  });

  if (loading) return <Spinner size="xl" />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      There was an error processing your request: {error.message}
    </Alert>
  );

  const employee = data.employee;

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" h={'550px'}>
      <VStack spacing={4} align="stretch" display={'flex'} alignContent={'center'} alignItems={'center'}>
        <Heading size="lg">Employee Details</Heading>
        <Text fontSize={'xl'}><strong>First Name:</strong> {employee.FirstName}</Text>
        <Text fontSize={'xl'}><strong>Last Name:</strong> {employee.LastName}</Text>
        <Text fontSize={'xl'}><strong>Age:</strong> {employee.Age}</Text>
        <Text fontSize={'xl'}><strong>Date of Joining:</strong> {new Date(parseInt(employee.DateOfJoining)).toLocaleDateString()}</Text>
        <Text fontSize={'xl'}><strong>Title:</strong> {employee.Title}</Text>
        <Text fontSize={'xl'}><strong>Department:</strong> {employee.Department}</Text>
        <Text fontSize={'xl'}><strong>Type:</strong> {employee.EmployeeType}</Text>
        <Text fontSize={'xl'}><strong>Status:</strong> {employee.CurrentStatus ? "Working" : "Retired"}</Text>
      </VStack>
    </Box>
  );
};

export default EmployeeDetails;
