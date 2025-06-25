import { Navigate, Route, Routes } from 'react-router'
import HomePage from '../pages/Home';
import PrivateRoute from '../components/PrivateRoute';
import ProfilePage from '../pages/Profile';
import AppLayout from '../layouts/AppLayout';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <Navigate to='/home' replace />
                </PrivateRoute>
            } />
            <Route path='/' element={<AppLayout />}>
                <Route path='/home' element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                } />
                <Route path='/temp' element={<div>trang temp route</div>} />
                <Route path='/:username' element={<ProfilePage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;

