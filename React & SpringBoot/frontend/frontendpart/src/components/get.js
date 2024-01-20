import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'

const Get = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/student/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const boxStyle = {
    width: '100%',
    maxWidth: '600px', 
    margin: 'auto', 
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center', 
    padding: '20px',
    boxSizing: 'border-box',
  };
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
      <div style={{textAlign:"center"}}>
        <h2>Get Student</h2>
      </div>
      <div style={boxStyle}>
        <TableBody>
          {data.map((data) => (
            <TableRow
              key={data.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{data.name}</TableCell>
              <TableCell align="left">{data.regNo}</TableCell>
              <TableCell align="left">{data.branch}</TableCell>
              <TableCell align="left">{data.phone}</TableCell>
              <TableCell align="left">{data.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </div>
    </motion.div>
  );
};

export default Get;