import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route
                    path="/dailyGame"
                    element={<MainPage gameMode="dailyGame" />}
                />
                <Route
                    path="/unlimited"
                    element={<MainPage gameMode="unlimited" />}
                />
            </Routes>
        </Router>
        // <div className="app-container">
        //     {/* <MainPage /> */}
        //     <HomePage />
        // </div>
    );
};

export default App;
