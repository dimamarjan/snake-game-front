import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const GET_USERS_URL = process.env.REACT_APP_USERS_URL;

export const getUsers = createAsyncThunk("users/get", async () => {
    const { data } = await axios.get(GET_USERS_URL);
    return data;
});
