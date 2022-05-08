import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScoreList, ScoreListItem, ScoreText } from "./scoreTable.style";

export function ScoreTable() {
    const usersListScore = useSelector((state) => state.snake.usersList);
    const loadedUsersListStatus = useSelector(
        (state) => state.snake.loadedUsersListStatus
    );
    const userName = useSelector((state) => state.snake.userName);

    const [isLoadedList, setIsLoadedList] = useState(false);

    useEffect(() => {
        if (loadedUsersListStatus === "fulfilled") {
            setIsLoadedList(true);
        }
    }, [loadedUsersListStatus]);

    return (
        <ScoreList>
            {isLoadedList &&
                usersListScore.map((user) => (
                    <ScoreListItem
                        key={user.user_id}
                        className={user.user_name === userName ? "current" : ""}
                    >
                        <ScoreText
                            className={`name ${
                                user.user_name === userName ? "current" : ""
                            }`}
                        >
                            {user.user_name}
                        </ScoreText>
                        <ScoreText>{user.user_score}</ScoreText>
                    </ScoreListItem>
                ))}
        </ScoreList>
    );
}
