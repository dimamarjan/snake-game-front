import styled from "@emotion/styled";
import { colors } from "../../style/colors";

export const ScoreList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ScoreListItem = styled.li`
    display: flex;
    padding: 15px;
    border-radius: 15px;
    background-color: ${colors.scoreListBcgColor};
    :not(:last-child) {
        margin-bottom: 15px;
    }
    &.current {
        background-color: ${colors.scoreListCurrentUserBcgColor};
    }
`;

export const ScoreText = styled.p`
    margin: 0;
    text-transform: uppercase;
    color: ${colors.mainTextColor};
    :not(:last-child) {
        margin-right: 10px;
    }
    &.name {
        width: 150px;
        color: ${colors.scoreListTextColor};
        font-weight: 800;
    }
    &.current {
        color: ${colors.scoreListCurrentUserTxtColor};
    }
`;
