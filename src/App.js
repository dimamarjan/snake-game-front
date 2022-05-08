import { useSelector } from "react-redux";
import { StartGame } from "./components/startGame/StartGame";
import { MainGameSection } from "./components/mainGameSection/MainGameSection";
import { Snake } from "./components/snake/Snake";
import { Food } from "./components/food/Food";
import { ScoreTable } from "./components/scoreTable/ScoreTable";

function App() {
    const userName = useSelector((state) => state.snake.userName);

    return (
        <div>
            {!userName && <StartGame />}
            {userName && (
                <MainGameSection>
                    <Snake />
                    <Food />
                    <ScoreTable />
                </MainGameSection>
            )}
        </div>
    );
}

export default App;
