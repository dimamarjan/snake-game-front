import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GameSection,
    MainGameContainer,
    GameOverBlock,
    GameOverMSG,
    ScoreListContainer,
    ScoreList,
    ScoreListItem,
    ScoreText,
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
    const usersListScore = useSelector((state) => state.snake.usersList);
    const loadedUsersListStatus = useSelector(
        (state) => state.snake.loadedUsersListStatus
    );

    const dispatch = useDispatch();

    const [isLoadedList, setIsLoadedList] = useState(false);
    const [isUpdatedList, setIsUpdatedList] = useState(false);

    const onClickHeandler = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (loadedUsersListStatus === "fulfilled") {
            setIsLoadedList(true);
        }
    }, [loadedUsersListStatus]);

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
            {!isGameOver && <MainGameContainer>{children}</MainGameContainer>}
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
            <ScoreListContainer>
                <ScoreList>
                    {isLoadedList &&
                        usersListScore.map((user) => (
                            <ScoreListItem
                                key={user.user_id}
                                className={
                                    user.user_name === userName ? "current" : ""
                                }
                            >
                                <ScoreText
                                    className={`name ${
                                        user.user_name === userName
                                            ? "current"
                                            : ""
                                    }`}
                                >
                                    {user.user_name}
                                </ScoreText>
                                <ScoreText>{user.user_score}</ScoreText>
                            </ScoreListItem>
                        ))}
                </ScoreList>
            </ScoreListContainer>
            <CurrentUserScoreSection>
                <CurrentUserScore>score: {userPoint}</CurrentUserScore>
            </CurrentUserScoreSection>
        </GameSection>
    );
}
