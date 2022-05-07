import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FoodBlock } from "./food.style";
import { gameArea } from "../../common/settings";
import {
    foodOperation,
    foodFiveOperation,
    foodTenOperation,
} from "../../store/snakeSlice";
import { colors } from "../../style/colors";

export function Food() {
    const food = useSelector((state) => state.snake.food);
    const foodFive = useSelector((state) => state.snake.foodFive);
    const foodTen = useSelector((state) => state.snake.foodTen);
    const snake = useSelector((state) => state.snake.snake);
    const dispatch = useDispatch();

    const genFoodCoordinates = (area) => {
        const left = Math.floor(Math.random() * (area[0] / 10 - 1)) * 10;
        const top = Math.floor(Math.random() * (area[1] / 10 - 1)) * 10;
        return [left, top];
    };

    const createFood = (kindOfFood) => {
        let condition = false;
        let coordinates;
        while (!condition) {
            coordinates = genFoodCoordinates(gameArea);
            if (snake[0].toString() !== coordinates.toString()) {
                condition = true;
            }
        }
        switch (kindOfFood) {
            case "one":
                dispatch(foodOperation(coordinates));
                return;
            case "five":
                dispatch(foodFiveOperation(coordinates));
                return;
            case "ten":
                dispatch(foodTenOperation(coordinates));
                return;
            default:
                return;
        }
    };

    useEffect(() => {
        if (!food.length) {
            createFood("one");
        }
        if (!foodFive.length) {
            createFood("five");
        }
        if (!foodTen.length) {
            createFood("ten");
        }
    });

    return (
        <>
            <FoodBlock
                top={food[0]}
                left={food[1]}
                backgroundColor={colors.foodMainOneColor}
            />
            <FoodBlock
                top={foodFive[0]}
                left={foodFive[1]}
                backgroundColor={colors.foodMainFiveColor}
            />
            <FoodBlock
                top={foodTen[0]}
                left={foodTen[1]}
                backgroundColor={colors.foodMainTenColor}
            />
        </>
    );
}
