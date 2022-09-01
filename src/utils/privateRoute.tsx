import { useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TokenService from 'services/tokenService';

const PrivateRoute = () => {
    // login auth : redirect "/"
    const auth = useRef<string | null>(TokenService.get(process.env.REACT_APP_TOEKN_KEY as string));

    return auth.current ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
