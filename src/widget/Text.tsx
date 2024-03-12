import React, { FC } from "react";
import { Text as RNText, TextProps } from "react-native";

export interface Props extends TextProps {}

const Text: FC<Props> = ({ style, ...props }) => {
    return (
        <RNText style={[{ color: "black" }, style]} {...props}>
            {props.children}
        </RNText>
    );
};

export default Text;
