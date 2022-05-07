import styled from "@emotion/styled";
import { colors } from "../../style/colors";

export const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: 100px auto 0;
`;

export const FormSection = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const HeaderGame = styled.h1`
    color: ${colors.mainTextColor};
    font-size: 50px;
`;

export const Label = styled.label`
    color: ${colors.mainTextColor};
    text-align: center;
    font-size: 30px;
    text-transform: uppercase;
    margin-bottom: 20px;
`;

export const InputField = styled.input`
    height: 50px;
    font-size: 40px;
    text-align: center;
`;

export const SubButton = styled.button`
    width: fit-content;
    text-transform: uppercase;
    color: ${colors.mainTextColor};
    background-color: ${colors.buttonsColor};
    border: none;
    padding: 15px;
    border-radius: 5px;
`;

export const KeysList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const KeysListItem = styled.li`
    :not(:last-child) {
        margin-bottom: 5px;
    }
`;

export const TextAccent = styled.span`
    color: ${colors.mainTextColor};
    margin: 0 10px;
`;

export const Message = styled.p`
    color: ${colors.alertMessage};
`;
