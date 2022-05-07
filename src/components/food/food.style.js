import styled from "@emotion/styled";
import { colors } from "../../style/colors";

export const FoodBlock = styled.div(
    {
        position: "absolute",
        height: "8px",
        width: "8px",
        border: `1px solid ${colors.foodSecondColor}`,
    },
    (props) => ({
        top: props.top,
        left: props.left,
        backgroundColor: props.backgroundColor,
    })
);
