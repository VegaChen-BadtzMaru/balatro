import React, { FC } from "react";
import { Text as RNText, TextProps } from "react-native";
import { CommonStyle } from "../util/CommonStyle";

export interface Props extends TextProps {}

const Text: FC<Props> = ({ style, ...props }) => {
    return (
        <RNText style={[{ color: CommonStyle.color.black }, style]} {...props}>
            {props.children}
        </RNText>
    );
};

export default Text;
