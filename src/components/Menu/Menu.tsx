import { useNavigate } from "react-router-dom";
import "./Menu.css";

interface MenuProps {
    previousGamesMenu?: boolean;
}

const Menu = ({ previousGamesMenu }: MenuProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="navbar">
            <div className="left">
                <button className="btn menu-button" onClick={handleBack}>
                    <i className="bi bi-arrow-left"></i>
                </button>
            </div>
            <p className="title">Scrambl</p>
            <div className="right">
                {!previousGamesMenu && (
                    <>
                        <button className="btn menu-button">
                            <i className="bi bi-bar-chart"></i>
                        </button>
                        <button
                            className="btn menu-button"
                            data-bs-toggle="modal"
                            data-bs-target="#infoModal"
                        >
                            <i className="bi bi-info-circle"></i>
                        </button>
                    </>
                )}
                <button className="btn menu-button">
                    <i className="bi bi-gear"></i>
                </button>
            </div>
        </div>
    );
};

export default Menu;
