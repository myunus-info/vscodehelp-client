import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import RegisterUserData from './components/Register/RegisterUserData';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/user-data" element={<RegisterUserData />} />
        <Route path="/user/authorization" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
