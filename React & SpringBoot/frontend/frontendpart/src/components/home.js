import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/728227.png';
import { motion } from 'framer-motion'

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '45rem',
}
const btn = {
  height: "3rem",
  width: "10rem",
  backgroundColor: "#4CAF50",
  color: "white",
  borderRadius: "5px",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundImage: `url(${backgroundImage})`,
  boxShadow: '0 4px 8px rgba(1, 1, 1, 1)',
}
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add');
  };
  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <button style={btn} onClick={handleClick}>Click Here</button>
    </motion.div>
  );
};

export default Home;