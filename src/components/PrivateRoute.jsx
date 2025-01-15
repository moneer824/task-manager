import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
    const { login, currentUser, activeTemplate } = useAuth();
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute