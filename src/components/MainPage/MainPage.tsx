import "./MainPage.css";
import Menu from "../Menu/Menu";
import GameSection from "../GameSection/GameSection";

interface MainPageProps {
    gameMode: string;
}

const MainPage = ({ gameMode }: MainPageProps) => {
    return (
        <>
            <Menu />
            <GameSection gameMode={gameMode} />
        </>
    );
};

export default MainPage;
