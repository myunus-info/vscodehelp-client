import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import RegisterUserData from './components/Register/RegisterUserData';
import VerifyEmail from './components/VerifyEmail/VerifyEmail';
import PrivateOutlet from './components/PrivateOutlet/PrivateOutlet';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/*" element={<PrivateOutlet />}>
        <Route path="user-data" element={<RegisterUserData />} />
        <Route path="authorization" lement={<VerifyEmail />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
