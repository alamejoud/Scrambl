import "./MainPage.css";
import Menu from "../Menu/Menu";
import GameSection from "../GameSection/GameSection";
import { useParams } from "react-router-dom";

interface MainPageProps {
    gameMode: string;
}

const MainPage = ({ gameMode }: MainPageProps) => {
    const { date } = useParams();
    return (
        <>
            <Menu />
            <GameSection gameMode={gameMode} date={date} />
        </>
    );
};

export default MainPage;
