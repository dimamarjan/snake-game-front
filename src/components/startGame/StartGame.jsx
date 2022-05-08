import { useEffect, useState } from "react";
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
import { colors } from "../../style/colors";

export function StartGame() {
    const [inputName, setInputName] = useState("");
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingImitationStr, setLoadingEmitationStr] = useState(".");
    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        if (e.target.value) {
            setInputName(e.target.value);
        }
    };

    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setTimeout(() => {
                setLoadingEmitationStr(loadingImitationStr + ".");
            }, 500);
        }
        if (loadingImitationStr.length > 20) {
            clearTimeout(interval);
            setLoadingEmitationStr(".");
        }
    }, [isLoading, loadingImitationStr]);

    const onCllickHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        checkUserName(inputName)
            .then(() => {
                dispatch(setUserNameOperation(inputName));
                dispatch(getUsers());
            })
            .catch((err) => {
                let message;
                if (err.code === "ERR_BAD_REQUEST") {
                    clearInterval(message);
                    setIsLoading(false);
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
                        <Message color={colors.alertMessageColor}>
                            *this name already used
                        </Message>
                    )}
                    {isLoading && (
                        <Message color={colors.loadingMessageColor}>
                            {loadingImitationStr}loading{loadingImitationStr}
                        </Message>
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
