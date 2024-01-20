import React, { useState, useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'

import backgroundImage from '../images/1269914.jpg';
import {
  Container,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from 'axios';

const boxStyle = {
  width: '100%',
  maxWidth: '700px',
  margin: 'auto',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  padding: '20px',
  boxSizing: 'border-box',
};

const Delete = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/student/');
        setData(response.data);
        setIsDataFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm !== "" && !isDataFetched) {
      fetchData();
    }
  }, [searchTerm, isDataFetched]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setIsDataFetched(false);
  };

  const handleDelete = async (regNo) => {
    try {
      console.log("Deleting student with regNo:", regNo);
      await axios.delete(`http://localhost:8080/student/${regNo}`);
      setSearchTerm('');
      setIsDataFetched(false);
      toast.success('Student deleted successfully!!!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: 'white',
        },
      });
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
      <h2 style={{ textAlign: "center" }}>Delete Student</h2>
      <div style={boxStyle}>
        <Container maxWidth="md">
          <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {isDataFetched && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Registration Number</TableCell>
                    <TableCell align="center">Branch</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.regNo}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="center">{item.regNo}</TableCell>
                      <TableCell align="center">{item.branch}</TableCell>
                      <TableCell align="center">{item.phone}</TableCell>
                      <TableCell sx={{ cursor: 'pointer' }} align="center">
                        <DeleteForeverRoundedIcon
                          onClick={() => handleDelete(item.regNo)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Delete;
