import React, { useState } from "react";
import {
  Input, Button, InputGroup,
  InputLeftElement,
  InputRightAddon
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import '../assets/css/style.css';

const EmployeeSearch = ({ onCriteriaChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const criteria = { searchText };
    console.log("criteria", criteria);
    onCriteriaChange(criteria);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input id="searchText" borderRadius={'8px'}
          type="text"
          value={searchText}
          onChange={handleChange}
          placeholder="Enter search text" />
        <InputRightAddon
          p={0}
          border="none"
        >
          <Button colorScheme='green' size="sm" borderLeftRadius={0} borderRightRadius={3.3} type="submit">
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </form>
  );
};

export default EmployeeSearch;
