import MainPage from "./components/MainPage/MainPage";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PreviousGames from "./components/PreviousGames/PreviousGames";

const App = () => {
    return (
        <Router basename="/Scrambl">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/dailyGame"
                    element={<MainPage gameMode="dailyGame" />}
                />
                <Route
                    path="/unlimited"
                    element={<MainPage gameMode="unlimited" />}
                />
                <Route path="/previousGames" element={<PreviousGames />} />
                <Route
                    path="/previousGames/:date"
                    element={<MainPage gameMode="previousGames" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
