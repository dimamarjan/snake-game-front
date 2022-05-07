import axios from "axios";

const ADD_USER_URL = process.env.REACT_APP_USERS_URL;

export const postUserScore = (userName, userScore) => {
    return axios.post(ADD_USER_URL, {
        user_name: userName,
        user_score: userScore,
    });
};
