import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SnakeBlock } from "./snake.style";
import { gameArea } from "../../common/settings";
import {
    snakeOperation,
    snakeGrowOperation,
    foodOperation,
    foodFiveOperation,
    foodTenOperation,
    pointsOperation,
    speedOperation,
    gameOverOperation,
} from "../../store/snakeSlice";
import { startSpeed } from "../../common/settings";

export function Snake() {
    const snake = useSelector((state) => state.snake.snake);
    const speed = useSelector((state) => state.snake.speed);
    const food = useSelector((state) => state.snake.food);
    const foodFive = useSelector((state) => state.snake.foodFive);
    const foodTen = useSelector((state) => state.snake.foodTen);
    const userPoint = useSelector((state) => state.snake.userPoints);
    const isGameOver = useSelector((state) => state.snake.isGameOver);

    const [direction, setDirection] = useState("right");
    const [intervalMovement, setIntervalMovement] = useState(null);
    const [isMovingTo, setIsMovingTo] = useState(null);
    const [level, setLevel] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const [prevKey, setPrevKey] = useState();

    const dispatch = useDispatch();

    const checkСannibalism = useCallback(
        (snakeArr) => {
            snakeArr.forEach((elem, i) => {
                if (i !== 0) {
                    if (snakeArr[0].toString() === elem.toString()) {
                        return dispatch(gameOverOperation());
                    }
                }
            });
        },
        [dispatch]
    );

    const blockReversDirection = useCallback(
        (direction) => {
            setDirection(direction);
            if (isMovingTo !== direction) {
                setIsMovingTo(direction);
            }
        },
        [isMovingTo]
    );

    const moving = useCallback(
        (direction) => {
            if (!isPaused && !isGameOver) {
                clearTimeout(intervalMovement);
                checkСannibalism(snake);
                switch (direction) {
                    case "right":
                        return setIntervalMovement(
                            setTimeout(() => {
                                let newMove = [];
                                if (snake[0][1] + 10 < gameArea[1]) {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0],
                                                elem[1] + 10,
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                } else {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0],
                                                elem[1] - elem[1],
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                }
                                dispatch(snakeOperation(newMove));
                                blockReversDirection(direction);
                            }, speed)
                        );
                    case "down":
                        return setIntervalMovement(
                            setTimeout(() => {
                                let newMove = [];
                                if (snake[0][0] + 10 < gameArea[0]) {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0] + 10,
                                                elem[1],
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                } else {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0] - elem[0],
                                                elem[1],
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                }
                                dispatch(snakeOperation(newMove));
                                blockReversDirection(direction);
                            }, speed)
                        );
                    case "left":
                        return setIntervalMovement(
                            setTimeout(() => {
                                let newMove = [];
                                if (snake[0][1] - 10 >= 0) {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0],
                                                elem[1] - 10,
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                } else {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0],
                                                elem[1] + gameArea[1] - 10,
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                }
                                dispatch(snakeOperation(newMove));
                                blockReversDirection(direction);
                            }, speed)
                        );
                    case "up":
                        return setIntervalMovement(
                            setTimeout(() => {
                                let newMove = [];
                                if (snake[0][0] - 10 >= 0) {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0] - 10,
                                                elem[1],
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                } else {
                                    snake.forEach((elem, i) => {
                                        if (i === 0) {
                                            newMove.push([
                                                elem[0] + gameArea[0] - 10,
                                                elem[1],
                                            ]);
                                        } else {
                                            newMove.push(snake[i - 1]);
                                        }
                                    });
                                }
                                dispatch(snakeOperation(newMove));
                                blockReversDirection(direction);
                            }, speed)
                        );
                    default:
                        return;
                }
            }
        },
        [
            blockReversDirection,
            checkСannibalism,
            dispatch,
            intervalMovement,
            isGameOver,
            isPaused,
            snake,
            speed,
        ]
    );

    const onKeyHandler = useCallback(
        // I needed to duplicate the setPrevKey() function for each case
        // in order to avoid blocking the snake's movement when pressing
        // the key several times.
        (e) => {
            switch (e.code) {
                case "ArrowRight":
                    if (isMovingTo !== "left" && prevKey !== "ArrowRight") {
                        setDirection("right");
                        return setPrevKey(e.code);
                    }
                    return;
                case "ArrowDown":
                    if (isMovingTo !== "up" && prevKey !== "ArrowDown") {
                        setDirection("down");
                        return setPrevKey(e.code);
                    }
                    return;
                case "ArrowLeft":
                    if (isMovingTo !== "right" && prevKey !== "ArrowLeft") {
                        setDirection("left");
                        return setPrevKey(e.code);
                    }
                    return;
                case "ArrowUp":
                    if (isMovingTo !== "down" && prevKey !== "ArrowUp") {
                        setDirection("up");
                        return setPrevKey(e.code);
                    }
                    return;
                case "Space":
                    if (!isPaused) {
                        setIsPaused(true);
                        return;
                    } else {
                        setIsPaused(false);
                        setDirection(isMovingTo);
                        return;
                    }
                default:
                    return;
            }
        },
        [isMovingTo, isPaused, prevKey]
    );

    const pointsCollect = useCallback(
        (snakeNeck, fnWhichOfFood, points) => {
            dispatch(snakeGrowOperation(snakeNeck));
            dispatch(fnWhichOfFood([]));
            dispatch(pointsOperation(points));
        },
        [dispatch]
    );

    useEffect(() => {
        window.addEventListener("keydown", onKeyHandler);
        return () => {
            window.removeEventListener("keydown", onKeyHandler);
        };
    }, [onKeyHandler]);

    useEffect(() => {
        if (direction) {
            moving(direction);
            setDirection(null);
        }
    }, [direction, moving]);

    useEffect(() => {
        if (snake[0].toString() === food.toString()) {
            pointsCollect(snake[1], foodOperation, 1);
        }
        if (snake[0].toString() === foodFive.toString()) {
            pointsCollect(snake[1], foodFiveOperation, 5);
        }
        if (snake[0].toString() === foodTen.toString()) {
            pointsCollect(snake[1], foodTenOperation, 10);
        }
    }, [food, foodFive, foodTen, pointsCollect, snake]);

    useEffect(() => {
        if (level !== Math.floor(userPoint / 50)) {
            setLevel(Math.floor(userPoint / 50));
            dispatch(speedOperation(startSpeed - level * 10));
        }
    }, [dispatch, level, userPoint]);

    return (
        <>
            {snake.map((elem, i) => (
                <SnakeBlock key={i} top={elem[0]} left={elem[1]} />
            ))}
        </>
    );
}
