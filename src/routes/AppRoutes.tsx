import { Route, Routes } from 'react-router'
import AuthPage from '../pages/Auth/AuthPage';
import Login from '../pages/Auth/ModalAuth/Login';
import SignUp from '../pages/Auth/ModalAuth/SignUp';
import HomePage from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            } />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
    )
}

export default AppRoutes;

