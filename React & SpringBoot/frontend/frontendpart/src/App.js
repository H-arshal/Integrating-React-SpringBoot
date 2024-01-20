import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import AnimatedRoutes from './animatedRoutes'
import ResponsiveAppBar from './components/navbar';
import backgroundImage from '../src/images/728227.png';
const myStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  height:"53.64rem",
}
function App() {
  return (
    <div className="App" style={myStyle}>
      <Router>
        <ResponsiveAppBar/>
        <AnimatedRoutes/>
      </Router>
    </div>
  );
}
export default App;