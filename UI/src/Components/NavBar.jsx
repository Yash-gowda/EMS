import React from "react";
import { Flex, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Flex  color="white" alignContent={'center'} justifyContent={'center'} p={4}>
      <Box>
        <Link as={RouterLink} to="/" mr={4}>Employee List</Link>
        <Link as={RouterLink} to="/create">Add Employee</Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
