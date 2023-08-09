import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AsyncPaginate } from "react-select-async-paginate";
import { SELECT_API_HEADERS, SELECT_API_URL } from "./api";
import axios from "axios";

const Search = ({onSearchChange}) => {

  const [search, setSearch] = useState(null);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "100px",
      border: "2px solid #ccc",
      boxShadow: state.isFocused ? "0 0 0 2px #3699FF" : null,
      maxWidth: "850px",
      margin: "0 auto",
      marginTop: '40px',
      marginBottom: '10px',
      paddingLeft: '30px',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(8px)",
      color: state.isFocused ? "white" : null
    }),
  };

  const extractLabelValues = (data) => {
    const arrayOfList = [];
    data.forEach(row => {
      const a = {
        value: `${row.latitude} ${row.longitude}`,
        label: `${row.name}, ${row.country}`,
      }
      arrayOfList.push(a);
    });

    return arrayOfList;
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  const loadOption = (inputValue) => {
    const results = axios.get(`${SELECT_API_URL}/cities?namePrefix=${inputValue}&minPopulation=1000000`, SELECT_API_HEADERS)
      .then((res) => {
        const optionList = extractLabelValues(res.data.data);

        const z = {
          options: optionList,
        }
        return z;
      })
      .catch(err => {
        alert(err);
        return {
          options: []
        }
      })
    
    if (results) {
      return results;      
    } else {
      return {
        options: []
      }
    }
  }

  return (
    <Container className="justify-content-center">
      <AsyncPaginate
        className="search-city"
        styles={customStyles}
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOption}
      />
    </Container>
  );
};

export default Search;
