import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  const userInfo = localStorage.getItem('userInfo') || user;
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
