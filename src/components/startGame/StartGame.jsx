import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    InputSection,
    FormSection,
    HeaderGame,
    Label,
    InputField,
    SubButton,
    KeysList,
    KeysListItem,
    TextAccent,
    Message,
} from "./startGame.style";
import { setUserNameOperation } from "../../store/snakeSlice";
import { getUsers } from "../../store/snakeAsyncOperations";
import { checkUserName } from "../../utils/checkUserName";

export function StartGame() {
    const [inputName, setInputName] = useState("");
    const [isShowMessage, setIsShowMessage] = useState(false);
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        setInputName(e.target.value);
    };

    const onCllickHandler = (e) => {
        e.preventDefault();
        checkUserName(inputName)
            .then(() => {
                dispatch(setUserNameOperation(inputName));
                dispatch(getUsers());
            })
            .catch((err) => {
                let message;
                if (err.code === "ERR_BAD_REQUEST") {
                    clearInterval(message);
                    setIsShowMessage(true);
                    message = setInterval(() => setIsShowMessage(false), 5000);
                }
            });
    };

    return (
        <>
            <InputSection>
                <FormSection onSubmit={onCllickHandler}>
                    <HeaderGame>SNAKE</HeaderGame>
                    <Label>
                        tell me your name
                        <InputField
                            onChange={onChangeHandler}
                            value={inputName}
                        />
                    </Label>
                    <SubButton type="submit">ready!</SubButton>
                    {isShowMessage && (
                        <Message>*this name already used</Message>
                    )}
                </FormSection>
            </InputSection>
            <InputSection>
                <KeysList>
                    <KeysListItem>Controll keys:</KeysListItem>
                    <KeysListItem>
                        to <TextAccent>TURN LEFT</TextAccent> press button:
                        <TextAccent>←</TextAccent>
                    </KeysListItem>
                    <KeysListItem>
                        to <TextAccent>TURN RIGHT</TextAccent> press button:
                        <TextAccent>→</TextAccent>
                    </KeysListItem>
                    <KeysListItem>
                        to <TextAccent>TURN UP</TextAccent> press button:
                        <TextAccent>↑</TextAccent>
                    </KeysListItem>
                    <KeysListItem>
                        to <TextAccent>TURN DOWN</TextAccent> press button:
                        <TextAccent>↓</TextAccent>
                    </KeysListItem>
                    <KeysListItem>
                        to <TextAccent>PAUSE</TextAccent> the GAME press button:
                        <TextAccent>SPACE</TextAccent>
                    </KeysListItem>
                </KeysList>
            </InputSection>
        </>
    );
}
