import styled from "@emotion/styled";
import { gameArea } from "../../common/settings";
import { colors } from "../../style/colors";

export const GameSection = styled.div`
    display: flex;
    width: 1080px;
    margin: 50px auto 0 auto;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const MainGameContainer = styled.div`
    position: relative;
    height: ${gameArea[0]}px;
    width: ${gameArea[1]}px;
    outline: 2px solid #4b287a;
    background-color: ${colors.gameFieldColor};
    margin-bottom: 20px;
`;

export const GameOverBlock = styled.div`
    display: flex;
    flex-direction: column;
    height: ${gameArea[0]}px;
    width: ${gameArea[1]}px;
    align-items: center;
    justify-content: center;
`;

export const GameOverMSG = styled.p`
    color: ${colors.mainTextColor};
    font-size: 150px;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
`;

export const ScoreListContainer = styled.div`
    width: 250px;
`;

export const CurrentUserScoreSection = styled.div`
    margin-top: 20px;
`;

export const CurrentUserScore = styled.p`
    padding: 0;
    margin: 0;
    color: ${colors.userScoreColor};
    font-size: 100px;
`;

export const RestartBtn = styled.button`
    width: fit-content;
    text-transform: uppercase;
    color: ${colors.mainTextColor};
    background-color: ${colors.buttonsColor};
    border: none;
    padding: 15px;
    border-radius: 5px;
`;
