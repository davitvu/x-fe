import { Route, Routes } from 'react-router'
import AuthPage from '../pages/Auth/AuthPage';
import Login from '../pages/Auth/ModalAuth/Login';
import SignUp from '../pages/Auth/ModalAuth/SignUp';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            {/* <Route path='/' element={<HomePage />} /> */}
        </Routes>
    )
}

export default AppRoutes;

