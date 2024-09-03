import React, { useState } from "react";
// Chakra imports
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Flex,
  Heading
} from '@chakra-ui/react';
import '../assets/css/style.css';
import {useMutation } from "@apollo/client";
import {ADD_EMPLOYEE} from '../mutation'

const EmployeeCreate = () => {
  const initialFormData = {
    FirstName: '',
    LastName: '',
    Age: '',
    DateOfJoining: '',
    Title: '',
    Department: '',
    EmployeeType: '',
    CurrentStatus: true
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      toast({
        title: "Employee Added",
        description: "The new employee has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        FirstName: '',
        LastName: '',
        Age: '',
        DateOfJoining: '',
        Title: '',
        Department: '',
        EmployeeType: '',
        CurrentStatus: true
      });
    },
    onError: (error) => {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';
    // Validation
    switch (name) {
      case 'FirstName':
      case 'LastName':
        // Allow only alphabets and spaces
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Only alphabets allowed';
        }
        break;
      case 'Age':
        // Check if numeric and 20 -70
        if (isNaN(value) || parseInt(value) <= 20 || parseInt(value) >= 70) {
          error = 'Age must be numeric and between 20 - 70';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const onClickSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.keys(formData).filter(key => formData[key] === '');

    if (emptyFields.length > 0) {
      const errorObj = {};
      emptyFields.forEach(field => {
        errorObj[field] = 'This field is required';
      });
      setErrors(errorObj);
      return;
    }
    try {
      await addEmployee({
        variables: {
          ...formData,
          Age: parseInt(formData.Age),
        }
      });
    } catch (err) {
      console.error("Error in form submission:", err);
    }

    console.log(formData);
    setFormData(initialFormData);
  };

  return (
    <Flex width={'70%'}>
      <Box as="form" w={'100%'} onSubmit={onClickSubmit} marginTop="20px">
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Enter Employee  Details
        </Heading>
        <FormControl isRequired className="form-control">
          <FormLabel className="form-label">First Name</FormLabel>
          <Input className="input" name="FirstName" value={formData.FirstName} onChange={handleChange} />
          {errors.FirstName && <div className="errorText">{errors.FirstName}</div>}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input className="input" name="LastName" value={formData.LastName} onChange={handleChange} />
          {errors.LastName && <div className="errorText">{errors.LastName}</div>}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Age</FormLabel>
          <Input className="input" name="Age" type="number" value={formData.Age} onChange={handleChange} />
          {errors.Age && <div className="errorText">{errors.Age}</div>}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date Of Joining</FormLabel>
          <Input className="input" name="DateOfJoining" type="date" value={formData.DateOfJoining} onChange={handleChange} />
          {errors.DateOfJoining && <div className="errorText">{errors.DateOfJoining}</div>}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Select className="input" name="Title" value={formData.Title} onChange={handleChange}>
            <option value="">Choose Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </Select>
          {errors.Title && <div className="errorText">{errors.Title}</div>}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Department</FormLabel>
          <Select className="input" name="Department" value={formData.Department} onChange={handleChange}>
            <option value="">Choose Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </Select>
          {errors.Department && <div className="errorText">{errors.Department}</div>}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Employee Type</FormLabel>
          <Select className="input" name="EmployeeType" value={formData.EmployeeType} onChange={handleChange}>
            <option value="">Choose Employee Type</option>
            <option value="FullTime">Full-Time</option>
            <option value="PartTime">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </Select>
          {errors.EmployeeType && <div className="errorText">{errors.EmployeeType}</div>}
        </FormControl>
        <Button colorScheme="blue" mt="4" type="submit">
          Add Employee
        </Button>
      </Box>
    </Flex>
  );
};

export default EmployeeCreate;
