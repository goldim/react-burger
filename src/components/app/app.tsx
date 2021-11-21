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
                        <Route path="register" element={<RegisterPage/>} />
                        <Route path="login" element={<LoginPage/>} />
                        <Route path="logout" element={<LogoutPage/>} />
                        <Route path="profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
                        <Route path="forgot-password" element={<ForgotPasswordPage/>} />
                        <Route path="reset-password" element={<ResetPasswordPage/>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                    </main>
                </Router>
            </div>
            <div id="react-modals"/>
        </Provider>
    );
}

export default App;
