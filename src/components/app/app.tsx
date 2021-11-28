import appStyles from './app.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main';
import RegisterPage from '../../pages/register';
import LoginPage from '../../pages/login';
import Page404 from '../../pages/not-found';
import ForgotPasswordPage from '../../pages/forgot-password';
import ProfilePage from '../../pages/profile';

import { Provider } from 'react-redux';
import { ReduxStore } from '../../services/storage'
import ResetPasswordPage from '../../pages/reset-password';
import ProtectedRoute from '../protected-route';
import LogoutPage from '../../pages/logout';
import IngredientDetailsPage from '../../pages/ingredient-details';
import AppHeader from '../app-header';
import ProtectedFromAuthedRoute from '../protected-from-authed';

function App() {
    return (
        <Provider store={ ReduxStore }>
            <div className={ appStyles.App }>
                <Router>
                    <AppHeader/>
                    <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="/ingredients/:id" element={<IngredientDetailsPage/>} />
                        <Route path="/constructor" element={<MainPage/>} />
                        <Route path="register" element={<ProtectedFromAuthedRoute><RegisterPage/></ProtectedFromAuthedRoute>} />
                        <Route path="login" element={<ProtectedFromAuthedRoute><LoginPage/></ProtectedFromAuthedRoute>} />
                        <Route path="logout" element={<ProtectedRoute><LogoutPage/></ProtectedRoute>} />
                        <Route path="profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
                        <Route path="forgot-password" element={<ProtectedFromAuthedRoute><ForgotPasswordPage/></ProtectedFromAuthedRoute>} />
                        <Route path="reset-password" element={<ProtectedFromAuthedRoute><ResetPasswordPage/></ProtectedFromAuthedRoute>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                    </main>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
