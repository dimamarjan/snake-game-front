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
                switch (direction) {
                    case "right":
                        clearTimeout(intervalMovement);
                        setIntervalMovement(
                            setTimeout(() => {
                                if (snake[0][1] + 10 < gameArea[1]) {
                                    checkСannibalism(snake);
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                } else {
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                }
                            }, speed)
                        );
                        return;
                    case "down":
                        clearTimeout(intervalMovement);
                        setIntervalMovement(
                            setTimeout(() => {
                                if (snake[0][0] + 10 < gameArea[0]) {
                                    checkСannibalism(snake);
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                } else {
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                }
                            }, speed)
                        );
                        return;
                    case "left":
                        clearTimeout(intervalMovement);
                        setIntervalMovement(
                            setTimeout(() => {
                                if (snake[0][1] - 10 >= 0) {
                                    checkСannibalism(snake);
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                } else {
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                }
                            }, speed)
                        );
                        return;
                    case "up":
                        clearTimeout(intervalMovement);
                        setIntervalMovement(
                            setTimeout(() => {
                                if (snake[0][0] - 10 >= 0) {
                                    checkСannibalism(snake);
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                } else {
                                    let newMove = [];
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
                                    dispatch(snakeOperation(newMove));
                                    blockReversDirection(direction);
                                }
                            }, speed)
                        );
                        return;
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
        (e) => {
            switch (e.code) {
                case "ArrowRight":
                    if (isMovingTo !== "left") {
                        return setDirection("right");
                    }
                    return;
                case "ArrowDown":
                    if (isMovingTo !== "up") {
                        return setDirection("down");
                    }
                    return;
                case "ArrowLeft":
                    if (isMovingTo !== "right") {
                        return setDirection("left");
                    }
                    return;
                case "ArrowUp":
                    if (isMovingTo !== "down") {
                        return setDirection("up");
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
        [isMovingTo, isPaused]
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
