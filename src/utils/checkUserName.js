import axios from "axios";

const CHECK_USER_URL = process.env.REACT_APP_USERS_CH_URL;

export const checkUserName = (userName) => {
    return axios.post(CHECK_USER_URL, {
        user_name: userName,
    });
};
