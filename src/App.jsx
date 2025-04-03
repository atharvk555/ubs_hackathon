import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Update_Profile } from './pages/Update_Profile';
import { jwtDecode } from 'jwt-decode';
import { Donor_Dashboard } from './pages/Donor_Dashboard';
import { School_Dashboard } from './pages/School_Dashboard';
import { Volunteer_Dashboard } from './pages/Volunteer_Dashboard';

const getTokenData = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token); // Decode JWT safely
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const tokenData = getTokenData();
  return tokenData ? children : <Navigate to="/" replace />;
};

const RoleBasedRoute = ({ children, allowedRole }) => {
  const tokenData = getTokenData();
  return tokenData && tokenData.role === allowedRole ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/update_profile' element={
          <ProtectedRoute>
            <Update_Profile />
          </ProtectedRoute>
        } />
        <Route path='/donor_dashboard' element={
          // <RoleBasedRoute allowedRole="donor">
            <Donor_Dashboard />
          // </RoleBasedRoute>
        } />
        <Route path='/school_dashboard' element={
          <RoleBasedRoute allowedRole="school">
            <School_Dashboard />
          </RoleBasedRoute>
        } />
        <Route path='/volunteer_dashboard' element={
          <RoleBasedRoute allowedRole="volunteer">
            <Volunteer_Dashboard />
          </RoleBasedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
