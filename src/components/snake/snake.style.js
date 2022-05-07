import styled from "@emotion/styled";
import { colors } from "../../style/colors";

export const SnakeBlock = styled.div(
    {
        position: "absolute",
        height: "10px",
        width: "10px",
        backgroundColor: colors.snakeColor,
        borderRadius: "30%",
    },
    (props) => ({
        top: props.top,
        left: props.left,
    })
);
