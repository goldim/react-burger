import appStyles from './app.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main';

function App() {
    return (
        <>
            <div className={ appStyles.App }>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                    </Routes>
                </Router>
            </div>
            <div id="react-modals"/>
        </>
    );
}

export default App;
