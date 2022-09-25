import { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from './pages/Profile';
import { AppContext } from './app/context';


function App() {

  const [currentUser, setCurrentUser] = useState({})
  const dispatchLoginEvent = (actionType, payload) => {
		switch (actionType) {
			case 'LOGIN_SUCESS':
        payload.logged = true
				setCurrentUser(payload);
				return;
      case 'LOGIN_EXPIRED':
        payload.logged = false
        setCurrentUser(payload);
        return;     
			default:
				return;
		}
	};

  return (
    <Router>
      <AppContext.Provider value={{ currentUser, dispatchLoginEvent }}>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
