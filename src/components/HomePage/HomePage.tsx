import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();

    const handleDailyGame = () => {
        navigate("/dailyGame");
    };

    const handleUnlimited = () => {
        navigate("/unlimited");
    };

    const handlePreviousGames = () => {
        navigate("/previousGames");
    };

    return (
        <div className="page-div">
            <div className="main-div">
                <img
                    className="icon-img"
                    width={"70px"}
                    height={"70px"}
                    src="/Scrambl/scrambl-logo.jpg"
                ></img>
                <p className="main-title">Scrambl</p>
                <div className="sub-title">
                    <p>Get 6 chances to guess</p>
                    <p>a 7-letter word.</p>
                </div>
                <div className="daily-game-div">
                    <div>Daily Game</div>
                    <div className="daily-game-date">
                        {new Date().toISOString().slice(0, 10)}
                    </div>
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={handleDailyGame}
                        >
                            Play
                        </button>
                    </div>
                </div>
                <div className="daily-game-div">
                    <div>
                        Unlimited &nbsp;<i className="bi bi-infinity"></i>
                    </div>
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={handleUnlimited}
                        >
                            Play
                        </button>
                    </div>
                </div>
                <hr className="w-100" />
                <div className="d-flex flex flex-column align-items-center gap-2">
                    <button
                        className="btn btn-dark d-flex gap-2 py-2 secondary-button"
                        onClick={handlePreviousGames}
                    >
                        <i className="bi bi-calendar-date d-block"></i>Previous
                        Games
                    </button>
                    <button className="btn btn-dark d-flex gap-2 py-2 secondary-button">
                        <i className="bi bi-gear d-block"></i>Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
