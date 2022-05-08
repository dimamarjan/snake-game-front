import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GameSection,
    MainGameContainer,
    GameOverBlock,
    GameOverMSG,
    ScoreListContainer,
    CurrentUserScoreSection,
    CurrentUserScore,
    RestartBtn,
} from "./mainGameSection.style";
import { postUserScore } from "../../utils/postUserScore";
import { getUsers } from "../../store/snakeAsyncOperations";

export function MainGameSection({ children }) {
    const userName = useSelector((state) => state.snake.userName);
    const userPoint = useSelector((state) => state.snake.userPoints);
    const isGameOver = useSelector((state) => state.snake.isGameOver);

    const dispatch = useDispatch();

    const [isUpdatedList, setIsUpdatedList] = useState(false);

    const onClickHeandler = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (isGameOver && !isUpdatedList) {
            postUserScore(userName, userPoint).then(() => {
                dispatch(getUsers());
                setIsUpdatedList(true);
            });
        }
    }, [dispatch, isGameOver, isUpdatedList, userName, userPoint]);

    return (
        <GameSection>
            {!isGameOver && (
                <MainGameContainer>
                    {children[0]}
                    {children[1]}
                </MainGameContainer>
            )}
            {isGameOver && (
                <GameOverBlock>
                    <GameOverMSG>
                        game
                        <br />
                        over
                    </GameOverMSG>
                    <RestartBtn onClick={onClickHeandler}>
                        play again
                    </RestartBtn>
                </GameOverBlock>
            )}
            <ScoreListContainer>{children[2]}</ScoreListContainer>
            <CurrentUserScoreSection>
                <CurrentUserScore>score: {userPoint}</CurrentUserScore>
            </CurrentUserScoreSection>
        </GameSection>
    );
}
