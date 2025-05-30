import { BrowserRouter, Route, Routes } from 'react-router'
import Login from '../pages/Auth/Login';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;

