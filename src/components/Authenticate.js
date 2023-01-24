import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Authenticate = ({ children }) => {
    const auth = useSelector(state => state.result.userId);
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
};

export default Authenticate;