import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Global App Styles (overrides bootstrap)

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MeetRoom from './pages/MeetRoom.jsx'
import RouteProtecter from './protectedRoute/RouteProtecter';
import LoginProtector from './protectedRoute/LoginProtector';
import Profile from './pages/Profile';
import bgImage from './images/background_main.png';

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="app-overlay"></div>
      <div className="app-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/login' element={<LoginProtector><Login /></LoginProtector>} />
          <Route path='/register' element={<LoginProtector><Register /></LoginProtector>} />
          <Route path="/meet/:id" element={<RouteProtecter> <MeetRoom /> </RouteProtecter>} />
          <Route path="/profile" element={<RouteProtecter> <Profile /> </RouteProtecter>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
