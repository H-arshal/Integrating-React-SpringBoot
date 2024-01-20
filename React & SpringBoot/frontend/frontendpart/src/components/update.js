import React, { useState, useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
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
  Button,
} from "@mui/material";
import axios from 'axios';

const paperStyle = {
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

const textFieldStyle = {
  marginBottom: '15px',
};

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

const handleRowClick = (item, setSelectedItem) => {
  setSelectedItem(item);
};

const Update = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [phone, setPhone] = useState('');
  const [regNo, setRegNo] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const updatedStudent = {
      name: name || selectedItem.name,
      branch: branch || selectedItem.branch,
      phone: phone || selectedItem.phone,
      regNo: regNo || selectedItem.regNo,
      email: email || selectedItem.email,
    };

    axios.put(`http://localhost:8080/student/${updatedStudent.regNo}`, updatedStudent)
      .then(() => {
        toast.success('Student updated successfully!', {
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
        console.log("Student Updated...");
      })
      .catch(error => {
        toast.error('Error updating student!', {
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
        console.error('Error Updating Student...', error);
      });

    console.log("Submitting student:", updatedStudent);
  };

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

  useEffect(() => {
  }, [name, branch, phone, regNo, email]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setIsDataFetched(false);
    setSelectedItem(null);
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
      <h2 style={{ textAlign: "center" }}>Update Student</h2>
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
                    <TableCell align="center">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow
                      key={item.regNo}
                      onClick={() => handleRowClick(item, setSelectedItem)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="center">{item.regNo}</TableCell>
                      <TableCell align="center">{item.branch}</TableCell>
                      <TableCell align="center">{item.phone}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <br />
          {selectedItem && (
            <Container>
              <Paper style={paperStyle}>
                <form>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    style={textFieldStyle}
                    value={name || selectedItem.name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Registration Number"
                    variant="outlined"
                    fullWidth
                    style={textFieldStyle}
                    value={regNo || selectedItem.regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    InputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Branch"
                    variant="outlined"
                    fullWidth
                    style={textFieldStyle}
                    value={branch || selectedItem.branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    style={textFieldStyle}
                    value={email || selectedItem.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    style={textFieldStyle}
                    value={phone || selectedItem.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </form>
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </Paper>
            </Container>
          )}
        </Container>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Update;
