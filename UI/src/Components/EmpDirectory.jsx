import React from "react";
import { ChakraProvider, Box, } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeCreate from './EmpCreate';
import EmployeeTable from './EmpTable';
import EmployeeSearch from './EmpSearch';
import EmployeeDetails from './EmpDetails';
import HeaderBanner from './HeaderBanner';
import Footer from './Footer';
import '../assets/css/style.css';

const EmployeeDirectory = () => {
  return (
    <ChakraProvider>
      <Router>
        <HeaderBanner />
        <Box p={5}>
          <Routes>
            <Route path="/create" element={<EmployeeCreate />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/" element={<EmployeeTable />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default EmployeeDirectory;
