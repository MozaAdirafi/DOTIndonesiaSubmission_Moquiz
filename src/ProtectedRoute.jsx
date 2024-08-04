import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const storedAuth = localStorage.getItem('isAuthenticated');
  const isAuth = storedAuth ? JSON.parse(storedAuth) : isAuthenticated;

  return isAuth ? children : <Navigate to="/" replace />;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
