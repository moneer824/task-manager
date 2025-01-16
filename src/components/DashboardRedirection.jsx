import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardRedirection = () => {
    const { currentUser, activeTemplate } = useAuth();
    return currentUser === null ? <Outlet /> : <Navigate to={`/${activeTemplate}/dashboard`} />;
}

export default DashboardRedirection