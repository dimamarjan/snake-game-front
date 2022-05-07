import { createSlice } from "@reduxjs/toolkit";
import { snakeStartCoordinates, startSpeed } from "../common/settings";
import { getUsers } from "./snakeAsyncOperations";

const snakeSlice = createSlice({
    name: "snake",
    initialState: {
        snake: snakeStartCoordinates,
        food: [],
        foodFive: [],
        foodTen: [],
        speed: startSpeed,
        userPoints: 0,
        isGameOver: false,
        userName: null,
        loadedUsersListStatus: "idle",
        usersList: [],
    },
    reducers: {
        snakeOperation(state, action) {
            state.snake = action.payload;
        },
        snakeGrowOperation(state, action) {
            state.snake.push(action.payload);
        },
        foodOperation(state, action) {
            state.food = action.payload;
        },
        foodFiveOperation(state, action) {
            state.foodFive = action.payload;
        },
        foodTenOperation(state, action) {
            state.foodTen = action.payload;
        },
        speedOperation(state, action) {
            state.speed = action.payload;
        },
        pointsOperation(state, action) {
            state.userPoints += action.payload;
        },
        gameOverOperation(state, _) {
            state.isGameOver = true;
        },
        setUserNameOperation(state, action) {
            state.userName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.usersList = action.payload.users;
            state.loadedUsersListStatus = "fulfilled";
        });
        builder.addCase(getUsers.pending, (state, action) => {
            state.loadedUsersListStatus = "pending";
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loadedUsersListStatus = "error";
        });
    },
});

export const {
    snakeOperation,
    snakeGrowOperation,
    foodOperation,
    foodFiveOperation,
    foodTenOperation,
    speedOperation,
    pointsOperation,
    gameOverOperation,
    setUserNameOperation,
} = snakeSlice.actions;

export default snakeSlice.reducer;
