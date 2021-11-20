import appStyles from './app.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main';
import RegisterPage from '../../pages/register';
import LoginPage from '../../pages/login';
import Page404 from '../../pages/not-found';
import ForgotPasswordPage from '../../pages/forgot-password';
import ProfilePage from '../../pages/profile';

function App() {
    return (
        <>
            <div className={ appStyles.App }>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="register" element={<RegisterPage/>} />
                        <Route path="login" element={<LoginPage/>} />
                        <Route path="profile" element={<ProfilePage/>} />
                        <Route path="forgot-password" element={<ForgotPasswordPage/>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </Router>
            </div>
            <div id="react-modals"/>
        </>
    );
}

export default App;
