import { Route, Routes } from 'react-router'
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
        </Routes>
    )
}

export default AppRoutes;

