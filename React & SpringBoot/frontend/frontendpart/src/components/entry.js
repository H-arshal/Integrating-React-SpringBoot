import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../images/1269914.jpg';
import { motion } from 'framer-motion'

const paperStyle = {
  padding: '30px 20px',
  width: '400px',
  margin: '20px auto',
  textAlign: 'center',
};

const textFieldStyle = {
  marginBottom: '15px',
};

const Entry = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regNo, setRegNo] = useState('');
  const [branch, setBranch] = useState('');

  const handleSubmit = () => {
    const student = { name, regNo, branch, email, phone };

    fetch('http://localhost:8080/student/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (response.status === 400) {
          toast.error('Please check your input.', {
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
        } else if (response.status === 409) {
          toast.error('Student with this Registration Number already exists!', {
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
        } else if (response.ok) {
          toast.success('New student added successfully!', {
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
          setName('');
          setRegNo('');
          setBranch('');
          setEmail('');
          setPhone('');
        }
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    >
      <h2 style={{ textAlign: 'center' }}>Add Student</h2>
      <Container>
        <Paper style={paperStyle}>
          <form>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              style={textFieldStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Registration Number"
              variant="outlined"
              fullWidth
              style={textFieldStyle}
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Branch"
              variant="outlined"
              fullWidth
              style={textFieldStyle}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              style={textFieldStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              fullWidth
              style={textFieldStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Paper>
      </Container>
      <ToastContainer />
    </motion.div >
  );
};

export default Entry;
