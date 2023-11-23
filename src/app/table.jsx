"use client"
import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TablePagination from "@mui/material/TablePagination";
import sortSVG from 'public/sort.jpg';
import "./table.css";
export default function DenseTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [clientSearchInput, setClientSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  useEffect(() => {
    const getMyData = async () => {
      const response = await axios.get(
        `https://search-app-backend.vercel.app/searchInclusive/totalData`
      );
      setFilteredData(response.data);
      setData(response.data);
    };
    getMyData();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getData = async (input) => {
    const response = await axios.get(
      `https://search-app-backend.vercel.app/searchInclusive/${input}`
    );
    console.log(response.data);
    setData(response.data);
    setFilteredData(response.data);
  };

  const handleSelectedInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClientSearchInput = (event) => {
    setClientSearchInput(event.target.value);
  };

  const handleAPISearch = () => {
    if (searchInput !== "") {
      getData(searchInput);
    } else {
      getData("totalData");
    }
  };

  const handleNestedSearch = (obj, target) => {
    // Recursively search through nested objects
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === "object") {
          // If the value is an object, perform a recursive search
          if (handleNestedSearch(value, target)) {
            return true;
          }
        } else if (
          typeof value === "string" &&
          value.toLowerCase().includes(target.toLowerCase())
        ) {
          // If the value is a string and matches the target, return true
          return true;
        }
      }
    }
    // If no match is found, return false
    return false;
  };

  const handleClientSearch = (event, column) => {
    console.log({ event, column });
    if (event.target.value !== "") {
      const filtered = data.filter((item) => {
        return item[column]
          .toString()
          .toLowerCase()
          .includes(event.target.value);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleClientSearch2 = (event, column) => {
    const target = event.target.value;

    if (target !== "") {
      const filtered = data.filter((item) => {
        const value = item[column];

        if (typeof value === "object") {
          return handleNestedSearch(value, target);
        } else if (
          typeof value === "string" &&
          value.toLowerCase().includes(target.toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };


  return (
    
    <div className="searchApp">
        <sortSVG/>
      <h1 align="center">Search App</h1>
      <div className="searchDiv">
        <TextField
          name="Search Here"
          sx={{ width: "80%" }}
          value={searchInput}
          onChange={handleSelectedInput}
        />
        <Button
          variant="contained"
          sx={{ width: "15%", height: "3.5rem" }}
          onClick={handleAPISearch}
        >
          Search
        </Button>
      </div>
      <TableContainer className = 'tableContainer' component={Paper}>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Customize the options as needed
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{backgroundColor: '#eeeeee' , width: '101.5vw'}}
        />
        <Table
          sx={{ minWidth: 650, background: "#eeeeee" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="middle"
                style={{ border: "1px solid #000000", minWidth: "3rem" }}
              >
                id <img src='/sort.png' onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField
                  size="small"
                  onChange={(e) => handleClientSearch(e, "id")}
                  InputProps={{ sx: { height: "1.5rem" } }}
                />
              </TableCell>
              <TableCell
                align="middle"
                style={{ border: "1px solid #000000", width: "15rem"}}
              >
                Name <img src={sortSVG} onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField
                  onChange={(e) => handleClientSearch(e, "name")}
                  size="small"
                  style={{ fontSize : '1rem'}}
                  InputProps={{ sx: { height: "1.5rem", width: '4rem' } }}
                />
              </TableCell>
              <TableCell align="middle" style={{ border: "1px solid #000000" }}>
                Age <img src={sortSVG} onClick={()=>{
                  let tempData = data;
                  tempData.sort((a, b) => a.age - b.age);
                  setFilteredData(tempData)}}/>
                <TextField
                  size="small"
                  onChange={(e) => handleClientSearch(e, "age")}
                  InputProps={{ sx: { height: "1.5rem", width: '4rem'} }}
                />
              </TableCell>
              <TableCell
                align="middle"
                style={{ border: "1px solid #000000", width: "100rem" }}
              >
                Street and City <img src={sortSVG} onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField size="small" InputProps={{ sx: { height: "2rem" ,width: '5rem'} }} onChange={(e) => handleClientSearch2(e, "address")}/>
              </TableCell>
              <TableCell
                align="middle"
                style={{ border: "1px solid #000000", width: "6rem" }}
              >
                Country <img src={sortSVG} onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField size="small" InputProps={{ sx: { height: "1.5rem",width: '5rem' } }} onChange={(e) => handleClientSearch2(e, "address")}/>
              </TableCell>
              <TableCell align="middle" style={{ border: "1px solid #000000" }}>
                Coordinates <img src={sortSVG} onClick={()=>{
                  let tempData = data;
                  tempData.sort((a, b) => a.address.coordinates.latitude - b.address.coordinates.latitude);
                  setFilteredData(tempData)}}/>
                <TextField size="small" InputProps={{ sx: { height: "1.5rem" } }} onChange={(e) => handleClientSearch2(e, "address")}/>
              </TableCell>
              <TableCell align="middle" style={{ border: "1px solid #000000" }}>
                Email <img src={sortSVG} onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField size="small" InputProps={{ sx: { height: "1.5rem" } }} onChange={(e) => handleClientSearch2(e, "contact")}/>
              </TableCell>
              <TableCell
                align="middle"
                style={{ border: "1px solid #000000", width: "10rem" }}
              >
                Phone <img src={sortSVG} onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField size="small" InputProps={{ sx: { height: "1.5rem" , width: '5rem'} }} onChange={(e) => handleClientSearch2(e, "contact")}/>
              </TableCell>
              <TableCell align="middle" style={{ border: "1px solid #000000" }}>
                Skills <img src={sortSVG} onClick={()=>{setFilteredData(filteredData)}}/>
                <TextField size="small" InputProps={{ sx: { height: "1.5rem" ,width: '4rem' } }} onChange={(e) => handleClientSearch2(e, "skills")}/>
              </TableCell>
              <TableCell
                align="middle"
                style={{ border: "1px solid #000000", width: "10rem" }}
              >
                Education <img src={sortSVG} onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField size="small" InputProps={{ sx: { height: "1.5rem" ,width: '5rem'} }} onChange={(e) => handleClientSearch2(e, "education")}/>
              </TableCell>
              <TableCell
                align="middle"
                style={{ border: "1px solid #000000", width: "10rem" }}
              >
                Projects <img src={sortSVG} onClick={()=>{setFilteredData([...filteredData].reverse())}}/>
                <TextField size="small" InputProps={{ sx: { height: "1.5rem" ,width: '4rem' } }} onChange={(e) => handleClientSearch2(e, "projects")}/>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.age}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.address.street},{row.address.city}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.address.country}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.address.coordinates.latitude}{" "}
                  {row.address.coordinates.longitude}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.contact.email}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.contact.phone}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  {row.skills.join(", ")}
                </TableCell>
                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  <div className="projects">
                    <span>Degree:</span>
                    {row.education[0].degree}
                    <br />
                    <span>Major:</span>
                    {row.education[0].major}
                    <br />
                    <span>University:</span>
                    {row.education[0].university}
                    <br />
                    <span>Year:</span>
                    {row.education[0].year}
                    <br />
                  </div>
                  <Divider variant="middle" style={{ margin: ".6rem 0" }} />
                  <div className="projects">
                    <span>Degree:</span>
                    {row.education[1].degree}
                    <br />
                    <span>Major:</span>
                    {row.education[1].major}
                    <br />
                    <span>University:</span>
                    {row.education[1].university}
                    <br />
                    <span>Year:</span>
                    {row.education[1].year}
                    <br />
                  </div>
                </TableCell>

                <TableCell
                  align="middle"
                  style={{ border: "1px solid #000000" }}
                >
                  <div className="projects">
                    <span>Title:</span>
                    {row.projects[0].title}
                    <br />
                    <span>Description:</span>
                    {row.projects[0].description}
                    <br />
                    <span>Contributor 1:</span>
                    {row.projects[0].contributors[0].name}
                    <br />
                    <span>Contributor 1 Role:</span>
                    {row.projects[0].contributors[0].role}
                    <br />
                    <span>Contributor 2:</span>
                    {row.projects[0].contributors[1].name}
                    <br />
                    <span>Contributor 2 Role:</span>
                    {row.projects[0].contributors[1].role}
                  </div>
                  <Divider variant="middle" style={{ margin: ".6rem 0" }} />
                  <div className="projects">
                    <span>Title:</span>
                    {row.projects[1].title}
                    <br />
                    <span>Description:</span>
                    {row.projects[1].description}
                    <br />
                    <span>Contributor 1:</span>
                    {row.projects[1].contributors[0].name}
                    <br />
                    <span>Contributor 1 Role:</span>
                    {row.projects[1].contributors[0].role}
                    <br />
                    <span>Contributor 2:</span>
                    {row.projects[1].contributors[1].name}
                    <br />
                    <span>Contributor 2 Role:</span>
                    {row.projects[1].contributors[1].role}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <footer align='center'>Made by Aditya K</footer>
    </div>
  );
}
