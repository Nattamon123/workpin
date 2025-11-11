import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    // ถ้ายังไม่ได้ login ให้ redirect ไปหน้า login
    return <Navigate to="/login" replace />;
  }

  // ถ้า login แล้ว ให้แสดงหน้าที่ต้องการ
  return children;
}

export default ProtectedRoute;
