import React, { useState, useEffect } from "react";
// Chakra imports
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useToast

} from '@chakra-ui/react';
import '../assets/css/style.css';
import {  useMutation } from "@apollo/client";
import {UPDATE_EMPLOYEE} from '../mutation'

const EmployeeUpdate = ({ isOpen, onClose, employeeToEdit }) => {
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
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
    const toast = useToast();

    useEffect(() => {
        if (employeeToEdit) {
            setFormData({
                ...employeeToEdit, DateOfJoining: formatDateToInputValue(parseInt(employeeToEdit.DateOfJoining)),
            });
        }
    }, [employeeToEdit]);

    function formatDateToInputValue(dateString) {
        const date = new Date(dateString);
        // Ensure it shows as YYYY-MM-DD
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
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

        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        setFormData(prev => ({ ...prev, [name]: value }));

    };
    const onClickSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Initialize an errors object
        let newErrors = {};
        if (!formData.Title || formData.Title.trim() === "") {
            newErrors.Title = "Title is required.";
        }
        if (!formData.Department || formData.Department.trim() === "") {
            newErrors.Department = "Department is required.";
        }
        if (!formData.EmployeeType || formData.EmployeeType.trim() === "") {
            newErrors.EmployeeType = "Employee Type is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            // Update the errors state and stop the function execution
            setErrors(newErrors);
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        

        try {
            await updateEmployee({ variables: { id: employeeToEdit.id, ...formData, Age: parseInt(formData.Age), CurrentStatus: formData.CurrentStatus === 'true' } });
            toast({
                title: "Employee updated successfully",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: "Failed to update employee",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <div>
            <Button onClick={onClose} colorScheme="blue" top="20px" left="95%">Add</Button>
            <Modal isOpen={isOpen} onClose={onClose} placement="top-right" size="xl">
                <ModalOverlay />
                <ModalContent marginTop="0" marginRight="0" marginBottom="0" marginLeft="auto">
                    <ModalHeader>Update Employee Details</ModalHeader>
                    <ModalBody>
                        <Box as="form" onSubmit={onClickSubmit}>
                            <FormControl isRequired className="form-control">
                                <FormLabel className="form-label">First Name</FormLabel>
                                <Input className="input" name="FirstName" value={formData.FirstName} onChange={handleChange} isReadOnly={true} />
                                <div className="errorText">{errors.FirstName && <span>{errors.FirstName}</span>}</div>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input className="input" name="LastName" value={formData.LastName} onChange={handleChange} isReadOnly={true} />
                                <div className="errorText">{errors.LastName && <span>{errors.LastName}</span>}</div>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Age</FormLabel>
                                <Input className="input" name="Age" type="number" value={formData.Age} onChange={handleChange} isReadOnly={true} />
                                <div className="errorText">{errors.Age && <span>{errors.Age}</span>}</div>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Date Of Joining</FormLabel>
                                <Input className="input" name="DateOfJoining" type="date" value={formData.DateOfJoining} onChange={handleChange} isReadOnly={true} />
                                <div className="errorText">{errors.DateOfJoining && <span>{errors.DateOfJoining}</span>}</div>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Title</FormLabel>
                                <Select className="input" name="Title" value={formData.Title} onChange={handleChange}>
                                    <option>Choose Title</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Director">Director</option>
                                    <option value="VP">VP</option>
                                </Select>
                                <div className="errorText">{errors.Title && <span>{errors.Title}</span>}</div>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Department</FormLabel>
                                <Select className="input" name="Department" value={formData.Department} onChange={handleChange}>
                                    <option >Choose Department</option>
                                    <option value="IT">IT</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                    <option value="Engineering">Engineering</option>
                                </Select>
                                <div className="errorText">{errors.Department && <span>{errors.Department}</span>}</div>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Employee Type</FormLabel>
                                <Select className="input" name="EmployeeType" value={formData.EmployeeType} onChange={handleChange}>
                                    <option >Choose Employee type</option>
                                    <option value="FullTime">Full-Time</option>
                                    <option value="PartTime">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Seasonal">Seasonal</option>
                                </Select>
                                <div className="errorText">{errors.EmployeeType && <span>{errors.EmployeeType}</span>}</div>
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" size="sm" onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" size="sm" type="submit" className="submit-button" onClick={onClickSubmit}>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EmployeeUpdate