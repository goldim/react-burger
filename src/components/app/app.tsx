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
import { ProvideAuth } from '../../services/auth';
import { FC, ReactNode, useLayoutEffect } from 'react';
import { getIngredients } from '../../services/middleware/ingredients';
import { useDispatch } from '../../services/hooks';
import FeedPage from '../../pages/feed';
import OrdersPage from '../../pages/orders';
import OrderPage from '../../pages/order';
import ProfileSettingsPage from '../../pages/profile-settings';

interface ILoadIngredientsProps {
    children: ReactNode
}

const LoadIngredients: FC<ILoadIngredientsProps> = ({children}) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (<>{ children }</>)
}

function App() {
    return (
        <ProvideAuth>
        <Provider store={ ReduxStore }>
        <LoadIngredients>
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
                        <Route path="feed" element={<FeedPage/>}/>
                        <Route path="/feed/:id" element={<OrderPage/>} />
                        <Route path="profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}>
                            <Route path="" element={<ProtectedRoute><ProfileSettingsPage/></ProtectedRoute>}/>
                            <Route path="settings" element={<ProtectedRoute><ProfileSettingsPage/></ProtectedRoute>}/>
                            <Route path="orders" element={<ProtectedRoute><OrdersPage/></ProtectedRoute>}>
                                <Route path=":id" element={<ProtectedRoute><OrderPage/></ProtectedRoute>} />
                            </Route>
                        </Route>
                        <Route path="forgot-password" element={<ProtectedFromAuthedRoute><ForgotPasswordPage/></ProtectedFromAuthedRoute>} />
                        <Route path="reset-password" element={<ProtectedFromAuthedRoute><ResetPasswordPage/></ProtectedFromAuthedRoute>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                    </main>
                </Router>
            </div>
        </LoadIngredients>
        </Provider>
        </ProvideAuth>
    );
}

export default App;
