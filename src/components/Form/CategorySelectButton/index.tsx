import React from "react";
import { GestureHandlerRootView, RectButtonProps } from "react-native-gesture-handler";
import { 
    Container,
    Category, 
    Icon 
} from "./styles";

interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}

export function CategorySelectButton({title, onPress, testID}: Props) {
    return(
        <GestureHandlerRootView>
            <Container onPress={onPress} testID={testID}>
                <Category>{title}</Category>
                <Icon name="chevron-down"/>
            </Container>
        </GestureHandlerRootView>
    );
}