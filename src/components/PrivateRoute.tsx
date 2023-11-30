import { Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import CategoryType from '../types/category';

interface PrivateRouteProps {
    isLoggedIn: boolean,
    flashMessage: (message:string, category:CategoryType) => void
}

const PrivateRoutes: React.FC<PrivateRouteProps> = ({ isLoggedIn, flashMessage }) => {

    useEffect(() => {
        if(!isLoggedIn){
            flashMessage('You must be logged in to access this page!', 'info')
        }
    }, [])

    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;